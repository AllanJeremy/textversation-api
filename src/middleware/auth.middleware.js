// Login functionality
const Auth = require("../modules/auth");
const Api = require("../lib/api");

module.exports.login = (req,res,next)=>{
    Auth.login(req.params.uid).then((response)=>{    
        let responseData = Api.getResponse(true,"Successfully logged in");
    
        res.status(200).json(responseData);
        next();
    }).catch((err)=>{
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Logout functionality
module.exports.logout = (req,res,next)=>{
    Auth.logout(req.params.uid).then((response)=>{
        let responseData = Api.getResponse(true,"Successfully logged out");
    
        res.status(200).json(responseData);
        next();
    }).catch((err)=>{
        res.status(500).json(Api.getError(err.message,err));
    });
};