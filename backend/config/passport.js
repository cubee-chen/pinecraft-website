// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // from Google Cloud Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find an existing user by Google ID
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Create a new user if one doesn't exist.
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            // For Google users, we don’t have a password so leave it undefined
            notionToken: "", // later to be updated by the user
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize/deserialize for session support
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
