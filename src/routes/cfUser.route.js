//* Cloud functions user routes
const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");

router.post("/update-nicknames", UserMiddleware.updateAllUserNicknames);

module.exports = router;
