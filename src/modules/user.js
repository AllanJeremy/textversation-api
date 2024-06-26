const UserModel = require("../models/user.model");
const chance = require("chance").Chance();

class User {
  getUserNickname(gender, maxLength) {
    maxLength = maxLength || 15;

    let nickname = chance.name({
      gender: gender
    });

    if (nickname.length > maxLength) {
      this.getUserNickname(gender, maxLength);
    } else {
      return nickname;
    }
  }

  //* ACTUAL DETAIL IMPLEMENTATION
  async getUser(userId) {
    let user = await UserModel.getUser(userId);
    return user;
  }

  async updateUser(userId, updateData) {
    // If there is no user data, don't bother
    if (!userId || !updateData) return false;

    // Generate a new nickname if we gender is provided as an update value
    if (updateData.gender) {
      updateData.nickname = this.getUserNickname(updateData.gender);
    }

    return UserModel.updateUser(userId, updateData);
  }

  //* ABSTRACTIONS
  async setAge(userId, newAge) {
    let updateData = {
      age: newAge
    };

    return this.updateUser(userId, updateData);
  }

  async setGender(userId, newGender) {
    let updateData = {
      gender: newGender
    };

    updateData.nickname = this.getUserNickname(newGender);

    return this.updateUser(userId, updateData);
  }

  async setGenderPreference(userId, newGenderPreference) {
    let updateData = {
      preferences: {
        gender: newGenderPreference
      }
    };

    return this.updateUser(userId, updateData);
  }

  async setAgePreference(userId, ageRange) {
    // At least one must have been set to proceeed with update
    if (!ageRange.min && !ageRange.max) return false;

    let updateData = {
      preferences: {
        minAge: ageRange.min,
        maxAge: ageRange.max
      }
    };

    return this.updateUser(userId, updateData);
  }

  // Get user interests
  async getUserInterests(userId) {
    let user = await this.getUser(userId);
    let userData = user.data();

    return user.exists ? userData.interests : {};
  }

  //* HELPER FUNCTIONS
  // Convert interests array to object
  _getInterestsObject(interests) {
    //? [Reason] Makes it easier for us to delete interests when they are objects in firebase
    let interestObject = {};
    interests.map(interest => {
      interestObject[interest.id] = interest;
    });

    return interestObject;
  }

  // Adds an object containing interests
  async setInterests(userId, interests) {
    let updateData = {
      interests: this._getInterestsObject(interests)
    };

    // updateData[interest.key] = { interestName: , interestType: , interestDescription: ,}

    return this.updateUser(userId, updateData);
  }

  //
  async removeInterest(userId, interestId) {
    //? Depends on user model directly
    return UserModel.removeInterest(userId, interestId);
  }

  //! n writes - where n = number of users
  async updateNicknames(users) {
    users.forEach(user => {
      let updateData = { gender: user.gender };
      this.updateUser(user.id, updateData);
    });
    return true;
  }
}

module.exports = new User();
