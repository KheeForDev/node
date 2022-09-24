const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configSettingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: { 
        type: Date, 
        default: Date.now
    },
    updatedBy: {
        type: String,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ConfigSetting", configSettingSchema);