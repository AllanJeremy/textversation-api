const InterestModel = require("../models/interest.model");

class Interest{
    static getAllInterests(){
        return InterestModel.getAllInterests();
    }

    static addInterests(categoryId,interests){
        return InterestModel.addInterests(categoryId,interests);
    }
}

module.exports = Interest;