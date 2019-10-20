const {db} = require("../database");

class UserModel{
    // Update user ~ creates user if the user does not exist
    async updateUser(uid,updateData){
        return db.collection("users").doc(uid).set(updateData,{merge:true});
    }
    
    // Delete user
    async deleteUser(uid){
        return db.collection("users").doc(uid).delete();
    }

}

module.exports = new UserModel();