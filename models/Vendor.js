const mongoose = require('mongoose'),

    const VendorSchema = new mongoose.Schema({
        trading_name: {
            type: String,
            required: true
        },
        merchant_id: String,
        category_id: {
            type: String,
            required: true
        },
        contact_person_name: {
            type: String,
            required: true,
        },
        email: String,
        contact_number: {
            type: Number,
            required: true
        },
        updated_at: Date,
        created_at: Date,
        user_id: [{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }]
    });

module.exports = mongoose.model('Vendor', VendorSchema);