const mongoose = require('mongoose');

const ItemExtraSchema = mongoose.Schema({
    price: { type: Number, default: 0 },
    name: { type: String, required: true },
    size: String,
    // should be an enum 
    // 0: stocked
    // 1: running_low [note: "less than 10"] 
    // 2: sold_out
    availability: { type: Number, default: 0 },
    group: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuItemExtraGroup'
    }, //e.g Sauces, Extras, Flavour etc
    menu: {
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuCategory'
    }],
});

module.exports = mongoose.model('MenuItemExtra', ItemExtraSchema);