const mongoose = require('mongoose');

const MenuCatgorySchema = mongoose.Schema({
    name: String,
    tag: String,
    menuItems: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem'
    }
});

module.exports = mongoose.model('MenuCategory', MenuCatgorySchema);