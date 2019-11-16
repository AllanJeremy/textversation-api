const {
    db,
    admin
} = require("../database");
const FieldValue = admin.firestore.FieldValue;

class ChatModel {
    constructor() {
        this.chatThreadCollectionRef = db.collection("chatThreads");
        this.chatCollectionRef = db.collection("chats");
    }

    // Filters out unnecessary parts of the user data
    _getChatThreadData(match) {
        let chatThreadData = {
            participantIds: [match.initiatorUser.id,match.prospectUser.id],
            userData: {
                initiator: match.initiatorUser,
                prospect: match.prospectUser
            },
            interestsMatched: match.interestsMatched,
            dateStarted: FieldValue.serverTimestamp()
        };

        return chatThreadData;
    }

    _getChatData(chatThreadId,messageData){
        let chatData = {
            userIds: [messageData.from.id,messageData.to.id], //! Possible vulnerability - if user passes random ids, we may not be able to prevent them from sending a message to other users
            ...messageData,
            threadId: chatThreadId,
            dateSent: FieldValue.serverTimestamp()
        };

        return chatData;
    }
    // Used implicitly when we match with someone
    newChats(matchData) { //? Batch
        // Messages
        let batch = db.batch();
        // Users
        matchData.map((match) => {
            let chatData = this._getChatThreadData(match);

            let chatDocRef = this.chatThreadCollectionRef.doc();
            batch.set(chatDocRef,chatData);
        });
        
        return batch.commit();
    }

    // Send a message
    async sendMessage(chatThreadId, messageData) { //! Delete message won't work with this structure, no message id generated/provided
        let threadInsertData = {
            lastMessage: messageData,
        };

        // Add the last message to the chat thread ~ we will be referencing this when displaying messages
        this.chatThreadCollectionRef.doc(chatThreadId).set(threadInsertData, {
            merge: true
        });

        let chatInsertData = this._getChatData(chatThreadId,messageData);

        // Add the actual chat to a chat file
        return this.chatCollectionRef.doc().set(chatInsertData,{merge: true});
    }
}

module.exports = new ChatModel();
