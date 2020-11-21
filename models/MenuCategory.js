const mongoose = require('mongoose');

const MenuCatgorySchema = mongoose.Schema({
    name: String,
    tag: String,
    menuItems: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem'
    }]
});
const Category = mongoose.model('MenuCategory', MenuCatgorySchema);

module.exports = Category;