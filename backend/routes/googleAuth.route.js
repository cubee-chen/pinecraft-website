// routes/googleAuth.route.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config({ path: "/etc/secrets/.env" }); // Use Render secret file path
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    // Now check for new fields instead of "age"
    if (
      !req.user.birthYear ||
      !req.user.birthMonth ||
      !req.user.gender ||
      !req.user.job
    ) {
      res.redirect(`${FRONTEND_URL}/signup-second`);
    } else {
      res.redirect(`${FRONTEND_URL}/`);
    }
  }
);

module.exports = router;
