const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    name: String,
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    }
});

module.exports = mongoose.model('Menu', MenuSchema);