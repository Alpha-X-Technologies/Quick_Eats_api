const mongoose = require('mongoose');

const OrderDetailSchema = mongoose.Schema({
    name: String,
    items: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem'
    }],
    totalItems: {
        type: Number,
        required: true,
    },
    totalAmount: mongoose.Types.Decimal128
});

module.exports = mongoose.model('OrderDetails', OrderDetailSchema);