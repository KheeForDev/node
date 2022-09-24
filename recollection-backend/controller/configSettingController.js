const ConfigSetting = require("../model/ConfigSetting");

const getAllConfigSettings = async (req, res) => {
    const configSettings = await ConfigSetting.find();

    if (!configSettings)
        return res.status(204).json({
            "message": "No config settings found."
        });

    res.json(configSettings);
}

module.exports = {
    getAllConfigSettings
}