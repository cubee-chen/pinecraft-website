// backend/routes/admin.route.js
const express = require("express");
const User = require("../models/user.model.js");
const verifyAdmin = require("../middleware/verifyAdmin.js");

const router = express.Router();

// GET /api/admin/users returns all users (without sensitive fields)
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    // Exclude information: username and password
    const users = await User.find({}).select("-username -password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// dangerous endpoint, Just for develpment purposes
router.delete("/delete-all-users", verifyAdmin, async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
