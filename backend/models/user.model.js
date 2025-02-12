// models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notionToken: { type: String, required: true },
    purchasedTemplates: {
      type: [String],
      default: [],
    },
    // New field for storing additional Notion info per template:
    notionInfo: {
      type: Map,
      of: new mongoose.Schema({
        // For example, for 專案管理 template:
        msn_db_id: { type: String },
        prj_db_id: { type: String },
        // For other templates you may only need one ID:
        main_db_id: { type: String },
      }),
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
