const mongoose = require('mongoose');

const ItemExtraGroupSchema = mongoose.Schema({
    name: {
        type: String,
        index: {
            unique: true
        }
    },
});

module.exports = mongoose.model('MenuItemExtraGroup', ItemExtraGroupSchema);