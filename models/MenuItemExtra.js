const mongoose = require('mongoose');

const MenuItemExtraSchema = mongoose.Schema({
    price: { type: mongoose.Types.Decimal128, default: 0.00 },
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

MenuItemExtraSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        if (ret.price) {
            ret.price = ret.price.toString();
        }
        delete ret.__v;
        return ret;
    }
})

module.exports = mongoose.model('MenuItemExtra', MenuItemExtraSchema);