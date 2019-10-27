const admin = require("firebase-admin");
const serviceAccount = require("../credentials/textversation-b6349-firebase-adminsdk-nrmye-812de2516c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://textversation-b6349.firebaseio.com"
});

module.exports = {
    admin: admin,
    db: admin.firestore(),
    firestore: admin.firestore
};