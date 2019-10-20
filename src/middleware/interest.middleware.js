const Api = require("../lib/api");
const Interest = require("../modules/interest");

module.exports.getAllInterests = (req,res,next)=>{
    let interests = Interest.getAllInterests().then(resolve);
    
    if(interests){
        let responseData = Api.getResponse(true,"Successfully retrieved all interests",interests);
        res.status(200).json(responseData);
        next();
    }else{ // Failed
        console.error("Something went wrong while trying to get all interests");
        console.error(err.message);
        let responseData = Api.getError("err.message,err");
        res.status(500).json(responseData);
    }
};
