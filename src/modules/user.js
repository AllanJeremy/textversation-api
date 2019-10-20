const UserModel = require("../models/user.model");

class User{

    //* ACTUAL DETAIL IMPLEMENTATION
    static async updateUser(userId,updateData){
        // If there is no user data, don't bother
        if(!userId || !updateData) return false;

        return UserModel.updateUser(userId,updateData);
    }

    //* ABSTRACTIONS
    static async setAge(userId,newAge){
        let updateData = {
            age: newAge
        };

        return this.updateUser(userId,updateData);
    }

    static async setGender(userId,newGender){
        let updateData = {
            gender: newGender
        };

        return this.updateUser(userId,updateData);
    }

    static async setGenderPreference(userId,newGenderPreference){
        let updateData = {
            preferences: {
                gender: newGenderPreference
            }
        };

        return this.updateUser(userId,updateData);
    }

    static async setAgePreference(userId,ageRange){
        // At least one must have been set to proceeed with update
        if((!ageRange.min && !ageRange.max)) return false;

        let updateData = {
            preferences: {
                minAge: ageRange.min,
                maxAge: ageRange.max
            }
        };

        return this.updateUser(userId,updateData);
    }

    // Adds an object containing interests
    static async setInterests(userId,interests){
        let updateData = {
        };

        // updateData[interest.key] = { interestName: , interestType: , interestDescription: ,}

        return this.updateUser(userId,updateData);
    }

    static async removeInterest(interestId){
        //TODO: Add implementation
        let updateData = {
        };

        return this.updateUser(userId,updateData);
    }
}

module.exports = User;