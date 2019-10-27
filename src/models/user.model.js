const {db} = require("../database");

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

}

module.exports = new UserModel();