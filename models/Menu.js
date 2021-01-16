const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    name: String,
    tag: String,
    menuCategories: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuCategory'
    }]
});

module.exports = mongoose.model('Menu', MenuSchema);