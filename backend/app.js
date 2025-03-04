// backend/app.js
require("dotenv").config({ path: "/etc/secrets/.env" }); // Use Render secret file path
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const passport = require("./config/passport");

const userRoute = require("./routes/user.route.js");
const templateRoute = require("./routes/template.route.js");
const crmRoute = require("./routes/crm.route.js");
const adminRoute = require("./routes/admin.route.js");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

if (!JWT_SECRET || !MONGO_URI) {
  console.error("Missing environment variables!");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: allowedOrigins,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// Setup session middleware (used by Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // for development only
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Test route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Google OAuth routes
const googleAuthRouter = require("./routes/googleAuth.route");
app.use("/api/auth", googleAuthRouter);

// Routes
app.use("/api/auth", userRoute);
app.use("/api/template", templateRoute);
app.use("/api/crm", crmRoute);
app.use("/api/admin", adminRoute);


// Serve any static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});





const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
