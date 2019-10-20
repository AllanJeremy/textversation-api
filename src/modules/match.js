const Config = require("../config/config");

class Match{
   

    async _findPotentialMatchesInCache(userId){
        //TOOD: Add implementation
    }

    // Criteria that must match is matching, returns true or false
    async _mainCriteriaMatch(userId1,userId2){
        //TODO: Add implementation
    }

    // Store potential match details
    async _storePotentialMatchDetails(userId1,userId2,matchDetails){
        //TODO: Add implementation

    }

    // Interests match ~ returns a number between 0 and 1 representing how similar they are
    async _getInterestMatchScore(userId1,userId2)
    {
        //TODO: Add implementation
    }

    //* HELPERS
    _getMatchVerdict(usersMatch){
        return usersMatch ? 'Match' : 'FailedMatch';
    }


    //* -----

    // Returns true if the users are a good match ~ false if not
    async _usersMatch(userId1,userId2){

        const mainCriteriaMatch = await this._mainCriteriaMatch(userId1,userId2);

        // Check if the match threshold
        let interestMatchScore = this._getInterestMatchScore(userId,userId2);
        
        let usersMatch = mainCriteriaMatch && (interestMatchScore >= Config.MIN_INTEREST_MATCH_THRESHOLD);

        let matchDetails = {
            mainCriteriaMatched: usersMatch,
            interestMatchScore: interestMatchScore,
            verdict: _getMatchVerdict(usersMatch),
            matchThreshold: Config.MIN_INTEREST_MATCH_THRESHOLD,
            date: Date()//TODO: Add actual date to firebase
        };


        //? We may want to start logging this
        this._storePotentialMatchDetails(userId,userId2,matchDetails);

        return usersMatch;
    }
  
    //* PUBLIC METHODS
    // Find and return matches for given user
    async findMatches(userId){
        let user = {};

        //TODO: Add implementation
    }
}

module.exports = Match;