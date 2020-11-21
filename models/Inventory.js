const mongoose = require('mongoose');

const InventoryItemSchema = mongoose.Schema({
    name: String
});


module.exports = mongoose.model('InventoryItem', InventoryItemSchema);