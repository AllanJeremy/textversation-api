const Api = require("../lib/api");
const Match = require("../modules/match");

// Find users that match with a specific user
module.exports.findMatches = (req,res,next)=>{
    Api.attachErrorHandler(res,
        Match.findMatches(req.params.uid).then((matches)=>{
            let isOk = matches.length > 0;
            let statusCode = isOk ? 200 : 404;
            let message = isOk ? 'Matches found' : 'Could not find any matches';
            let responseData = Api.getResponse(isOk,message,matches,statusCode);

            res.status(responseData.statusCode).json(responseData);
            next();
        })
    )();
};

//? Getting of users that have matched with a certain user will be done on the frontend
