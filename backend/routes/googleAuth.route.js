// backend/routes/googleAuth.route.js
const express = require("express");
const passport = require("passport");

const router = express.Router();

// Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // After authentication, check if additional profile info is needed.
    // For example, if age, gender, or job is not set, redirect to signup-second.
    if (!req.user.age || !req.user.gender || !req.user.job) {
      res.redirect("/final-register");
    } else {
      res.redirect("/");
    }
  }
);

module.exports = router;
