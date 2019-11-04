const express = require("express");
const router = express.Router();
const MatchMiddleware = require("../middleware/match.middleware");

// Find matches for user with the id of `uid`
router.post("/find/:uid",MatchMiddleware.findMatches);

module.exports = router;