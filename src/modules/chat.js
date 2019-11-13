const ChatModel = require("../models/chat.model");

class Chat {
    constructor() {
        console.log("New chat created");
    }
    _cleanseMessageData(messageData) {
        let cleansedData = {
            from: messageData.from,
            to: messageData.to,
            text: messageData.text,
            media: messageData.media || null,
        };

        return cleansedData;
    }

    sendMessage(chatId, messageData) {
        messageData = this._cleanseMessageData(messageData);

        return ChatModel.sendMessage(chatId, messageData);
    }

    newChats(matchData){
        return ChatModel.newChats(matchData);
    }
}


module.exports = new Chat();