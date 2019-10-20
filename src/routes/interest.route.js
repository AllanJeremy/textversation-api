const express = require("express");
const router = express.Router();

const InterestMiddleware = require("../middleware/interest.middleware");

// Get all interests
router.get('/',InterestMiddleware.getAllInterests);

module.exports = router;