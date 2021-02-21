const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    trading_name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    merchant_id: String,
    //NOTE needs to be encrypted
    merchant_key: String,
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuCategory'
    }],
    //we don't need these values for the vendor as these properties should be referenced from the user that this 
    //vendor is registered to

    // contact_person_name: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // contact_number: {
    //     type: Number,
    //     required: true
    // },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Vendor', VendorSchema);