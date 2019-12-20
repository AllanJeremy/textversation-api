const User = require("../modules/user");
const Api = require("../lib/api");

// Simply refactoring to keep code DRY
function _setUpdateResponse(req, res, next, updatedItemName) {
  let statusCode = 201;
  let responseData = Api.getResponse(
    true,
    `Successfully updated ${updatedItemName}`,
    {
      newValue: req.body.newValue
    },
    statusCode
  );

  res.status(201).json(responseData);
  next();
}

// Update user
module.exports.updateUser = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.updateUser(req.body.uid, req.body.data).then(response => {
      _setUpdateResponse(req, res, next, "user");
    })
  );
};

// Update user token
module.exports.updateUserToken = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.updateUser(req.params.userId, req.body.data).then(response => {
      _setUpdateResponse(req, res, next, "user token");
    })
  );
};

// Set age
module.exports.setAge = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.setAge(req.body.uid, req.body.newValue).then(response => {
      _setUpdateResponse(req, res, next, "age");
    })
  );
};

// Set the gender
module.exports.setGender = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.setGender(req.body.uid, req.body.newValue).then(response => {
      _setUpdateResponse(req, res, next, "gender");
    })
  );
};

// Set age preference
module.exports.setAgePreference = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.setAgePreference(req.body.uid, req.body.newValue).then(response => {
      _setUpdateResponse(req, res, next, "age preference");
    })
  );
};

// Set gender preference
module.exports.setGenderPreference = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.setGenderPreference(req.body.uid, req.body.newValue).then(response => {
      _setUpdateResponse(req, res, next, "gender preference");
    })
  );
};

// Add interests
module.exports.addInterests = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.setInterests(req.body.uid, req.body.interests).then(response => {
      let responseData = Api.getResponse(
        true,
        "Successfully added interests",
        req.body.interests,
        201
      );

      res.status(responseData.statusCode).json(responseData);
      next();
    })
  );
};

// Remove an interest
module.exports.removeInterest = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.removeInterest(req.body.uid, req.params.interestId).then(response => {
      let responseData = Api.getResponse(
        true,
        "Successfully removed interest",
        response,
        201
      );

      res.status(responseData.statusCode).json(responseData);
      next();
    })
  );
};

// Update all user nicknames
//? Possibly needs optimization once we get more than 1000 users
module.exports.updateAllUserNicknames = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    User.updateNicknames(req.body.data).then(() => {
      let responseData = Api.getResponse(
        true,
        "Successfully updated user nicknames",
        null,
        201
      );
      res.status(responseData.statusCode).json(responseData);
      next();
    })
  );
};
