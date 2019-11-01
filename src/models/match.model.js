const {db,firestore,admin} = require("../database");
const FieldValue = admin.firestore.FieldValue;

//? Controls how we fetch data - eg. limits on how much data we can fetch
const DataConfig = require("../config/data.config"); 

class MatchModel{
    constructor(){
        this.matchPoolRef = db.collection("matchPool");
        this.matchedWithBeforeRef = db.collection("matchedUsers");
        this.matchesRef = db.collection("matches");
        this.matchLogRef = db.collection("matchLogs");
    }

    //* MATCH POOL
    // Returns a reference of a user in the match pool with the specified id
    _userInMatchPoolRef(userId){
        return this.matchPoolRef.where("id","==",userId);
    }

    // Returns the user with the id of `userId` in the match pool
    async userInPool(userId){ //* Tested & Working
        let userQuerySnapshot = await this._userInMatchPoolRef(userId).get(); 
        return userQuerySnapshot.size > 0;
    }

    // Add to pool
    async addToMatchPool(user){ //* Tested & Working
        let userInPool = await this.userInPool(user.id);

        // Set the date joined if they are not already in the pool
        if(!userInPool){
            user.dateJoined = FieldValue.serverTimestamp();
            
            return this.matchPoolRef.doc().set(user,{
                merge:true
            });
        }

        // Do not add the user to pool if they are already in the pool
        return false;
    }

    removeFromMatchPool(userId){ //? DONE
        return this._userInMatchPoolRef(userId).delete();
    }

    // Get prospects ~ people that are in match pool & match basic criteria
    async getProspects(currentUser){//? DONE
        /* Firebase note:
        //* You can only perform range comparisons (<, <=, >, >=) on a single field, and you can include at most one array-contains clause in a compound query
        https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
        */
        return this.matchPoolRef
            .where("gender","==",currentUser.preferences.gender) //? Add composite index for `gender`
            .where("age",">=",currentUser.preferences.minAge) //? Add composite index for `age`
            .where("age","<=",currentUser.preferences.maxAge) 
            .orderBy("dateJoined","asc")//? First come first serve implementation
            .limit(DataConfig.MAX_PROSPECTS)
            .get();
    }

    //* MATCH & MATCH LOGS

    // Store matched users in a special collection ~ we will be referencing this collection when trying to find previously matched users
    async _logMatchedUsers(matchedUsers){ //TODO: Actually figure out how we will pass this user data in
       //TODO: Add implementation
    }

    // Add match ~ store details of successful match
    async addMatch(matchDetails){
        //TODO: Add implementation

        // this._logMatchedUsers();
    }

    // Save match details to db - logging
    async saveMatchDataToDb(matchData){

    }

    // Get all users that previously matched with the user with the id of `userId`
    async getPreviouslyMatchedUsers(userId){

    }
}

module.exports = new MatchModel();