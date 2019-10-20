const {db} = require("../database");

class InterestModel{

    static getAllInterests(){
        let interestsRef = db.collection("interests");

        return interestsRef.get();
    }
}


module.exports = InterestModel;