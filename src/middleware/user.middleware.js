const User = require("../modules/user");
const Api = require("../lib/api");

// Update user
module.exports.updateUser = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.updateUser(req.body.uid,req.body.data)
        .then((response)=>{
            //TODO: Add implementation
            let responseData = {

            };

            res.status(201).json(responseData);
            next();
        })
    );
};

// Set age
module.exports.setAge = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.setAge(req.body.uid,req.body.newValue)
        .then((response)=>{
            //TODO: Add implementation
            let responseData = {

            };

            res.status(201).json(responseData);
            next();
        })
    );
};

// Set the gender
module.exports.setGender = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.setGender(req.body.uid,req.body.newValue)
        .then((response)=>{
            //TODO: Add implementation
            let responseData = {

            };

            res.status(201).json(responseData);
            next();
        }),
    );
};

// Set age preference
module.exports.setAgePreference = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.setAgePreference(req.body.uid,req.body.newValue)
        .then((response)=>{
            //TODO: Add implementation
            let responseData = {

            };

            res.status(201).json(responseData);
            next();
        })
    );
};

// Set gender preference
module.exports.setGenderPreference = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.setGenderPreference(req.body.uid,req.body.newValue)
        .then((response)=>{
            //TODO: Add implementation
            let responseData = {

            };

            res.status(201).json(responseData);
            next();
        })
    );
};

// Add interests
module.exports.addInterests = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.setInterests(req.body.uid,req.body.interests)
        .then((response)=>{
            let responseData = Api.getResponse(true,"Successfully added interests",req.body.interests,201);

            res.status(responseData.statusCode).json(responseData);
            next();
        })
    );
};

// Remove an interest
module.exports.removeInterest = (req,res,next)=>{
    Api.attachErrorHandler(res,
        User.removeInterest(req.body.uid,req.params.interestId)
        .then((response)=>{
            let responseData = Api.getResponse(true,"Successfully removed interest",response,201);

            res.status(responseData.statusCode).json(responseData);
            next();
        })
    );
};