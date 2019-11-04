const {firestore} = require("../database");

const DataConfig = require("../config/data.config");
const MatchConfig = require("../config/match.config");
const User = require("./user");
const MatchModel = require("../models/match.model");
const MatchAlgo = require("../algorithms/match.algorithm");

class Match{
    // Returns a user with the id as part of the object returned
    async _getUserWithId(userId){
        let currentUserDoc = await User.getUser(userId);
        let currentUser = currentUserDoc.exists ? currentUserDoc.data() : null;

        // Return false if the user with the provided id was not foundcurrentUser
        if(!currentUser){ //? {} Used for clarity's sake when reading the code
            return false;
        }

        // Add the current user's id to the user returned
        currentUser.id = userId;

        // Remove other user fluff irrelevant to the users of this function
        delete currentUser.lastLogin;
        delete currentUser.loggedIn;

        return currentUser;
    }

    // Get users that have previously matched with the user with the id of `userId`
    async _getPreviouslyMatchedUserIds(currentUserId){
        let prevMatchedUsersSnapshot = await MatchModel.getPreviouslyMatchedUsers(currentUserId); //! [read] Query 3

        let prevMatchedUserIds = prevMatchedUsersSnapshot.docs.map((doc)=>{
            let match = doc.data();
            let currIdIndex = match.userIds.indexOf(currentUserId);
            match.userIds.splice(currIdIndex,1);
            return match.userIds[0]; //? Assumes match has 2 people ~ may need to change if we begin comparing more than 2 people
            //TODO: Flatten array & return `match.userIds` to return all ids for `n` people matched ~ in future
        });

        return prevMatchedUserIds;
    }

    // Removes previously matched users and returns users that match basic criteria
    async _getProspects(currentUser){
        let allProspects = await MatchModel.getProspects(currentUser);//! [read] Query 2 
        if(allProspects.size == 0) return [];

        //* Only get previously matched users if there are prospects ~ save on reads
        let previouslyMatchedUserIds = await this._getPreviouslyMatchedUserIds(currentUser.id);

        // Only return prospects that match basic criteria and we have not matched with before
        let prospects = allProspects.docs.map((doc)=>{
            let prospect = doc.data();
            if(prospect.id == currentUser.id) return false;

            let matchedBefore = previouslyMatchedUserIds.includes(prospect.id);
            
            // If we have matched with the prospect before ~ do not return them as a prospect
            if(matchedBefore){
                console.log(`Matched with this user (id: ${prospect.id}) before: Ignoring...`);
                return false;
            }

            // Only return the prospect if we haven't matched with them before
            return prospect;
        });
        prospects = prospects.filter(prospect=>prospect); //? Only return truthy values | AKA valid prospects in this case

        return prospects;
    }

    // Interests match ~ returns a number between 0 and 1 representing how similar they are
    _getInterestMatchData(user1,user2)
    {
        let interestMatchData = MatchAlgo.ajInterestMatchCalc(user1.interests,user2.interests);
        return interestMatchData;
    }

    //* HELPERS
    _getMatchVerdict(usersMatch){
        return usersMatch ? 'Match' : 'FailedMatch';
    }
    
    //* -----

    _limitMatchedUsers(matchedUsers){
        return matchedUsers.filter((user,index)=>{
            return index < DataConfig.MAX_MATCHES; //? Returns up to `MAX_MATCHES` matches
        });
    }

    // Returns true if the users are a good match ~ false if not
    async _storePotentialMatchDetails(user1,user2,interestMatchScore){//TODO: Needs proper implementation
        let usersMatch = interestMatchScore >= MatchConfig.MIN_INTEREST_MATCH_THRESHOLD;

        let matchDetails = {
            interestMatchScore: interestMatchScore,
            user1: user1,
            user2: user2,
            isMatch: usersMatch,
            verdict: _getMatchVerdict(usersMatch),
            matchThreshold: MatchConfig.MIN_INTEREST_MATCH_THRESHOLD,
            date: FieldValue.serverTimestamp()
        };

        // TODO: Store potential match details

        return usersMatch;
    }

    //* PUBLIC METHODS
    // Find and return matches for given user
    async findMatches(userId){ 
        //TODO: Check if the user has waited long enough before trying to perform another request
        let currentUser = await this._getUserWithId(userId); //! [read] Query 1 

        // If the current user was not found ~ don't bother trying to find matches
        if(!currentUser) return [];

        const prospects = await this._getProspects(currentUser);
        //* PROSPECTS WITH INTEREST MATCHING SCORE CALCULATED
        // Prospects whose interest matching values have been calculated
        let computedProspects = prospects.map((prospect)=>{
            let matchData = this._getInterestMatchData(currentUser,prospect);
            
            let prospectData = {
                initiatorUser: currentUser,
                prospectUser: prospect,
                ...matchData
            };
            return prospectData;
        });
        //TODO: Log the computed prospects


        //* MATCHED USERS
        // Prospects that were actually a match
        let matchedProspects = computedProspects.filter((computedProspect)=>{
            return computedProspect.isMatch;
        });
        
        // Top `MAX_MATCHES` matches returned only ~ Add to previously matched users
        let finalMatchedProspects = this._limitMatchedUsers(matchedProspects);
       
        // Add match : also adds to previously matched users
        MatchModel.addMatch(finalMatchedProspects); //? Working

        //* MATCH POOL
        // Add the current user to the matching pool so that other users can match with him/her
        MatchModel.addToMatchPool(currentUser); //! [write] Query 4
        return finalMatchedProspects;
    }
}

module.exports = new Match();