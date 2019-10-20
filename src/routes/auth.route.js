const express = require("express");
const router = express.Router();


const AuthMiddleware = require("../middleware/auth.middleware");

// Login ~ update user login status
router.post('/login/:uid',AuthMiddleware.login);

// Logout ~ update user login status
router.post('/logout/:uid',AuthMiddleware.logout);

module.exports = router;