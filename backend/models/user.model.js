// models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    notionToken: { type: String, default: "" },
    purchasedTemplates: { type: [String], default: [] },
    notionInfo: {
      type: Map,
      of: new mongoose.Schema({
        msn_db_id: { type: String },
        prj_db_id: { type: String },
        main_db_id: { type: String },
      }),
      default: {},
    },
    // Extra profile fields to be completed after OAuth
    age: { type: Number },
    gender: { type: String },
    job: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
