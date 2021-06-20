const mongoose = require('mongoose');

const PushDeviceSchema = mongoose.Schema({
    uuid: String,
    token: String,
    //0 android
    //1 ios
    platform: Number,
});

module.exports = mongoose.model('PushDevice', PushDeviceSchema);