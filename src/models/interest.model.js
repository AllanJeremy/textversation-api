const { db } = require("../database");

class InterestModel {
  constructor() {
    this.interestsRef = db.collection("interests");
  }

  // Add an interest int the categoryId provided
  addInterests(categoryId, data) {
    if (!data.interests.length) return;

    let interests = data.interests.map((singleInterest, index) => {
      if (!singleInterest) return;

      //? Generate an id based on the category id
      singleInterest.id = `${categoryId}_${index}`;

      return singleInterest;
    });

    let insertData = {
      interests: interests
    };

    return this.interestsRef.doc(categoryId).set(insertData, {
      merge: true
    });
  }

  getAllInterests() {
    return this.interestsRef.get();
  }
}

module.exports = new InterestModel();
