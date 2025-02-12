const express = require('express');

const { createTemplate, getAllTemplates } = require('../controllers/template.controller.js');

const router = express.Router();

router.post("/create", createTemplate);
router.get("/get", getAllTemplates);

module.exports = router;