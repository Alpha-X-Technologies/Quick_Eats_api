const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const NotificationSchema = mongoose.Schema({
    body: String,
    title: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

NotificationSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });
module.exports = mongoose.model('Notification', NotificationSchema);