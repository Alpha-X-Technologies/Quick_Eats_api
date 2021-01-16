const mongoose = require('mongoose');

const MenuCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    tag: String,
    picture_url:String
    // menuItems: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'MenuItem'
    // }]
});


const Category = mongoose.model('MenuCategory', MenuCategorySchema);

module.exports = Category;