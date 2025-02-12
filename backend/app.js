// backend/app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoute = require("./routes/user.route.js");
const templateRoute = require("./routes/template.route.js");
const adminRoute = require("./routes/admin.route.js");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/auth", userRoute);
app.use("/api/template", templateRoute);
app.use("/api/admin", adminRoute);


// // Serve any static files from the React app
// app.use(express.static(path.join(__dirname, "build")));

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });





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
