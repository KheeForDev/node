const express = require("express");
const router = express.Router();
const configSettingController = require("../../controller/configSettingController");

router.get("/", configSettingController.getAllConfigSettings);
router.post("/add", configSettingController.addConfigSetting);
router.put("/update", configSettingController.updateConfigSetting);
router.delete("/delete", configSettingController.deleteConfigSetting);

module.exports = router;