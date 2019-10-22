const express = require("express");
const router = express.Router();

const InterestMiddleware = require("../middleware/interest.middleware");

// Insert interests
router.post('/:categoryId',InterestMiddleware.addInterests);

// Get all interests
router.get('/',InterestMiddleware.getAllInterests);

module.exports = router;