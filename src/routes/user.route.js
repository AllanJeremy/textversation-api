const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");

//* User
// Update user
router.post("/", UserMiddleware.updateUser);

// Update user token
router.patch("/token/:userId", UserMidddleware.updateUserToken);

//* User attributes
// Set gender
router.post("/gender", UserMiddleware.setGender);

// Set age
router.post("/age", UserMiddleware.setAge);

//* Preferences
// Set age preference ~ includes age range
router.post("/preferences/age", UserMiddleware.setAgePreference);

// Set gender preference
router.post("/preferences/gender", UserMiddleware.setGenderPreference);

//* Interests
// Add user interests
router.post("/interests", UserMiddleware.addInterests);

// Delete an interest
router.delete("/interests/:interestId", UserMiddleware.removeInterest);

module.exports = router;
