const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  notionUrl: { type: String, required: true }, // Notion 模板的 URL
  imageUrl: { type: String },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
