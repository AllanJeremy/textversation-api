const UserModel = require("../models/user.model");
const {admin} = require("../database");
const FieldValue = admin.firestore.FieldValue;

class Auth{
    //* HELPERS
    async _updateLoginStatus(uid,isLoggedIn){
        let updateData = {
            loggedIn: isLoggedIn,
        };

        // Only save last login if we are logging in
        if(isLoggedIn){
            updateData.lastLogin = FieldValue.serverTimestamp();
        }

        let updateUserStatus = UserModel.updateUser(uid,updateData);
        return updateUserStatus;
    }

    //* -------

    // Login ~ there is no signup since we are using anonymous logins
    async login(uid){
        return this._updateLoginStatus(uid,true);
    }

    // Update the status of the user to logged out
    async logout(uid){
        return this._updateLoginStatus(uid,false);
    }
}

module.exports = new Auth();