const Api = require("../lib/api");
const Match = require("../modules/match");

// Find users that match with a specific user
module.exports.findMatches = (req, res, next) => {
  Api.attachErrorHandler(
    res,
    Match.findMatches(req.params.uid).then(matches => {
      const shouldWaitBeforeMatch = matches === false;

      const isOk = shouldWaitBeforeMatch ? false : matches.length > 0;
      const statusCode = 200;
      let message = isOk ? "Matches found" : "Could not find any matches";

      if (shouldWaitBeforeMatch) {
        message = "Matched already. Please wait before matching again.";
      }

      let responseData = Api.getResponse(isOk, message, matches, statusCode);

      res.status(responseData.statusCode).json(responseData);
      next();
    })
  );
};

//? Getting of users that have matched with a certain user will be done on the frontend
