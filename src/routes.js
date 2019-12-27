const express = require("express");
const router = express.Router();

// Routes
const AuthRoutes = require("./routes/auth.route");
const ChatRoutes = require("./routes/chat.route");
const UserRoutes = require("./routes/user.route");
const InterestRoutes = require("./routes/interest.route");
const MatchRoutes = require("./routes/match.route");

//* Official route setup
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/interests", InterestRoutes);
router.use("/match", MatchRoutes);
router.use("/chat", ChatRoutes);

// Export
module.exports = router;
