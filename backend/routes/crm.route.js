const express = require('express');

const { updateCRMProfile } = require("../controllers/crm.controller.js");

const router = express.Router();

router.post("/update", updateCRMProfile);

module.exports = router;