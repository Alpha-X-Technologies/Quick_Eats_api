const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    name: String,
    tag: String,
    menuItems: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuItems'
    }
});

module.exports = mongoose.model('Menu', MenuSchema);