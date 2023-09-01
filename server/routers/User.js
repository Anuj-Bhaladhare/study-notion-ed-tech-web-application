// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
  singUp,
  login,
  sendotp,
  changePassword,
} = require("../controllers/Autho");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewears/auth"); // Corrected spelling here

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user signup
router.post("/signup", singUp);

// Route for user login
router.post("/login", login);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for Changing the password
router.post("/changePassword", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;
