const User = require("../modules/user");
const Api = require("../lib/api");

// Update user
module.exports.updateUser = (req,res,next)=>{
    User.updateUser(req.body.uid,req.body.data)
    .then((response)=>{
        //TODO: Add implementation
        let responseData = {

        };

        res.status(201).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Set age
module.exports.setAge = (req,res,next)=>{
    User.setAge(req.body.uid,req.body.newValue)
    .then((response)=>{
        //TODO: Add implementation
        let responseData = {

        };

        res.status(201).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Set the gender
module.exports.setGender = (req,res,next)=>{
    User.setGender(req.body.uid,req.body.newValue)
    .then((response)=>{
        //TODO: Add implementation
        let responseData = {

        };

        res.status(201).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Set age preference
module.exports.setAgePreference = (req,res,next)=>{
    User.setAgePreference(req.body.uid,req.body.newValue)
    .then((response)=>{
        //TODO: Add implementation
        let responseData = {

        };

        res.status(201).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Set gender preference
module.exports.setGenderPreference = (req,res,next)=>{
    User.setGenderPreference(req.body.uid,req.body.newValue)
    .then((response)=>{
        //TODO: Add implementation
        let responseData = {

        };

        res.status(201).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Add interests
module.exports.addInterests = (req,res,next)=>{
    User.setInterests(req.body.uid,req.body.interests)
    .then((response)=>{
        let responseData = Api.getResponse(true,"Successfully added interests",req.body.interests,201);

        res.status(responseData.statusCode).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};

// Remove an interest
module.exports.removeInterest = (req,res,next)=>{
    User.removeInterest(req.body.uid,req.params.interestId)
    .then((response)=>{
        let responseData = Api.getResponse(true,"Successfully removed interest",response,201);

        res.status(responseData.statusCode).json(responseData);
        next();
    })
    .catch((err)=>{
        console.error("Something went wrong while trying to update the user");
        console.error(err.message);
        res.status(500).json(Api.getError(err.message,err));
    });
};