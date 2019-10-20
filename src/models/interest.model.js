const {db} = require("../database");

class InterestModel{

    getAllInterests(){
        let interestsRef = db.collection("interests");

        return interestsRef.get();
    }
}


module.exports = new InterestModel();