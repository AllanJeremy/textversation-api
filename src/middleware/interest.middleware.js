const Api = require("../lib/api");
const Interest = require("../modules/interest");

let _getInterestData = (interestDocs)=>{
    return interestDocs.map((doc)=>{
        let docData = {};
        docData[doc.id] =  doc.data();
        return docData;
    });
};

module.exports.getAllInterests = (req,res,next)=>{
    Interest.getAllInterests().then((response)=>{ // response : QuerySnaspshot
        let isOk = !response.empty;
        let responseStatus =  isOk ? 200 : 404;
        let message = isOk ? "Successfully retrieved all interests" : "Interests not found";
        let data = _getInterestData(response.docs);

        let responseData = Api.getResponse(isOk,message,data,responseStatus);
        
        res.status(responseData.statusCode).json(responseData);
        next();
    }).catch((err)=>{
        console.error("Something went wrong while trying to get all interests");
        console.error(err.message);
        
        let responseData = Api.getError(err.message,err);
        res.status(500).json(responseData);
    });
};
