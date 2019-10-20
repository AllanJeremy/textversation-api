const InterestModel = require("../models/interest.model");

class Interest{
    static async getAllInterests(){
        let test = InterestModel.getAllInterests();
        return test;
    }
}

module.exports = Interest;