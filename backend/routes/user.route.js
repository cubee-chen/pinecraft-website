const express = require("express");
const verifyToken = require("../middleware/verifyToken.js");
const {
  registerTemp,
  finalizeRegistration,
  userLogin,
  updatePassword,
  userLogout,
  getUserProfile,
  purchasedTemplate,
  updateNotionInfoPM
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register-temp", registerTemp); // Step 1: Store user data temporarily
router.post("/final-register", finalizeRegistration); // Step 2: Finalize registration with Notion Token
router.post("/login", userLogin); // User login
router.post("/forget-password", updatePassword);
router.get("/logout", userLogout); // User logout
router.post("/purchase", purchasedTemplate); // Purchase a template
router.post("/update-notion-info/pm", updateNotionInfoPM);


// PROTECTED route -> must have valid cookie token
router.get("/profile", verifyToken, getUserProfile); // Get user profile

module.exports = router;
