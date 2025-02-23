const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("../models/user.model.js");
const Template = require("../models/template.model.js");

const userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "登出成功" });
    });
  });
};

const updateProfile = async (req, res) => {
  try {
    const { birthYear, birthMonth, gender, job, notionToken } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (birthYear !== undefined) user.birthYear = birthYear;
    if (birthMonth !== undefined) user.birthMonth = birthMonth;
    if (gender !== undefined) user.gender = gender;
    if (job !== undefined) user.job = job;
    if (notionToken !== undefined) user.notionToken = notionToken;

    await user.save();
    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

const purchasedTemplate = async (req, res) => {
  try {
    const { email, templateName } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const template = await Template.findOne({ name: templateName });
    if (!template) {
      return res.status(404).json({ message: "模板不存在" });
    }

    if (user.purchasedTemplates.includes(templateName)) {
      return res.status(400).json({ message: "您已經購買過此模板" });
    }

    user.purchasedTemplates.push(templateName);
    await user.save();

    res.status(200).json({
      message: "購買成功",
      purchasedTemplates: user.purchasedTemplates,
      notionUrl: template.notionUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNotionInfoPM = async (req, res) => {
  try {
    const { email, templateName, msnDbUrl, prjDbUrl } = req.body;

    if (!msnDbUrl.includes("notion.so") || !prjDbUrl.includes("notion.so")) {
      return res
        .status(400)
        .json({ message: "無效的 Notion 資料庫網址：必須包含 'notion.so'" });
    }

    if (!msnDbUrl.includes("https://") || !prjDbUrl.includes("https://")) {
      return res
        .status(400)
        .json({ message: "無效的 Notion 資料庫網址：必須包含 'https://'" });
    }

    const prjSegments = prjDbUrl.split("/");
    const msnSegments = msnDbUrl.split("/");

    const prjLast = prjSegments[prjSegments.length - 1] || "";
    const msnLast = msnSegments[msnSegments.length - 1] || "";

    const prjDbId = prjLast.split("?")[0];
    const msnDbId = msnLast.split("?")[0];

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "無效的 email" });
    }

    user.notionInfo.set(templateName, {
      prj_db_id: prjDbId,
      msn_db_id: msnDbId,
    });
    await user.save();

    res.status(200).json({ message: "Notion 資料庫網址儲存成功" });
  } catch (error) {
    res.status(500).json({ message: "網址錯誤或伺服器錯誤，請重新輸入" });
  }
};

module.exports = {
  userLogout,
  updateProfile,
  getUserProfile,
  purchasedTemplate,
  updateNotionInfoPM,
};
