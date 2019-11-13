const express = require("express");
const router = express.Router();

const Chat = require("../modules/chat");

// Send message 
router.post("/:chatId",Chat.sendMessage);

module.exports = router;