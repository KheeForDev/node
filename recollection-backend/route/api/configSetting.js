const express = require("express");
const router = express.Router();
const configSettingController = require("../../controller/configSettingController");

router.get("/", configSettingController.getAllConfigSettings);

module.exports = router;