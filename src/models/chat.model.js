const {
    db,
    admin
} = require("../database");
const FieldValue = admin.firestore.FieldValue;

class ChatModel {
    constructor() {
        this.chatCollectionRef = db.collection("chatThreads");
    }

    // Filters out unnecessary parts of the user data
    _getChatData(match) {
        let chatData = {
            participants: [match.initiatorUser.id,match.prospectUser.id],
            messages: [],
            dateStarted: FieldValue.serverTimestamp()
        };

        return chatData;
    }

    // Used implicitly when we match with someone
    newChats(matchData) { //? Batch
        // Messages
        let batch = db.batch();
        // Users
        matchData.map((match) => {
            let chatData = this._getChatData(match);

            let chatDocRef = this.chatCollectionRef.doc();
            batch.set(chatDocRef,chatData);
        });
        
        return batch.commit();
    }

    // Send a message
    async sendMessage(chatId, messageData) { //! Delete message won't work with this structure, no message id generated/provided
        let insertData = {
            messages: [messageData]
        };

        return this.chatCollectionRef.doc(chatId).set(insertData, {
            merge: true
        });
    }
}

module.exports = new ChatModel();
