const mongoose = require('mongoose');

const MenuCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    picture_url: String
});


const MenuItemCategory = mongoose.model('MenuCategory', MenuCategorySchema);

module.exports = MenuItemCategory;