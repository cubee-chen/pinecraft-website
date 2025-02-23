const express = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js");
const {
  userLogout,
  updateProfile,
  getUserProfile,
  purchasedTemplate,
  updateNotionInfoPM
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/logout", userLogout)

router.post("/purchase", purchasedTemplate); // Purchase a template
router.post("/update-notion-info/pm", updateNotionInfoPM);


// Use session-based authentication for protected routes
router.post("/update-profile", ensureAuthenticated, updateProfile);
router.get("/profile", ensureAuthenticated, getUserProfile);

module.exports = router;
