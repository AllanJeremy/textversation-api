const express = require("express");
const router = express.Router();

const ChatMiddleware = require("../middleware/chat.middleware");

// Send message 
router.post("/send/:chatId",ChatMiddleware.sendMessage);

module.exports = router;