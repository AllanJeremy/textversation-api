// Login functionality
const Auth = require("../modules/auth");
const User = require("../modules/user");
const Api = require("../lib/api");

function _getUserData(user){ //? `user` is the query snapshot
    let userData = user.data(); //? Access user properties through this
    return {
        id: user.id,
        loggedIn: userData.loggedIn
    };
}

module.exports.login = (req,res,next)=>{
    let uid = req.params.uid;

    Auth.login(uid).then(async (response)=>{    
        console.log(response);
        let loggedInUser = await User.getUser(uid);
        let userData = _getUserData(loggedInUser);

        let responseData = Api.getResponse(true,"Successfully logged in",{
            user: userData
        });
    
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