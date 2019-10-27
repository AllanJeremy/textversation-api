const {db,firestore} = require("../database");

class UserModel{
    // Get user
    getUser(uid){
        return db.collection("users").doc(uid).get();
    }

    // Update user ~ creates user if the user does not exist
    updateUser(uid,updateData){
        return db.collection("users").doc(uid).set(updateData,{merge:true});
    }
    
    // Delete user
    deleteUser(uid){
        return db.collection("users").doc(uid).delete();
    }

    removeInterest(uid,interestId){//? Leech ~ depends on update user
        let updateData = {
            interests: {
                [interestId]: firestore.FieldValue.delete() // Deletes the interest with the id of `interestId`
            }
        };

        return this.updateUser(uid,updateData);
    }

}

module.exports = new UserModel();