const ConfigSetting = require("../model/ConfigSetting");

const getAllConfigSettings = async (req, res) => {
    const configSettings = await ConfigSetting.find();

    if (!configSettings)
        return res.status(204).json({
            "message": "No config settings found."
        });

    res.json(configSettings);
};

const addConfigSetting = async (req, res) => {
    if (!req?.body?.name || !req?.body?.type)
        return res.status(400).json({
            "message": "Name and type are required."
        });

    try {
        const result = await ConfigSetting.create({
            name: req.body.name,
            type: req.body.type,
            createdBy: "Admin",
            updatedBy: "Admin"
        });

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
};

const updateConfigSetting = async (req, res) => {
    if (!req?.body?.id)
        return res.status(400).json({
            "message": "ID is required."
        });

    const configSetting = await ConfigSetting.findOne({
        _id: req.body.id
    }).exec();

    if (!configSetting)
        return res.status(204).json({
            "message": `No config setting matches ID ${req.body.id}.`
        });

    if (req.body?.name) configSetting.name = req.body.name;
    if (req.body?.type) configSetting.type = req.body.type;

    const result = await configSetting.save();
    res.status(200).json(result);
};

const deleteConfigSetting = async (req, res) => {
    if (!req?.body?.id)
        return res.status(400).json({
            "message": "ID is required."
        });

    const configSetting = await ConfigSetting.findOne({
        _id: req.body.id
    }).exec();

    if (!configSetting)
        return res.status(204).json({
            "message": `No config setting  matches ID ${req.body.id}`
        });

    const result = await configSetting.deleteOne({ _id: req.body.id });
    res.status(200).json(result);
};

module.exports = {
    getAllConfigSettings,
    addConfigSetting,
    updateConfigSetting,
    deleteConfigSetting
}