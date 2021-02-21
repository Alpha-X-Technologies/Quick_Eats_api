const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Menu', MenuSchema);