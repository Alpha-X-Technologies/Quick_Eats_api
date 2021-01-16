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
    category: [{
        name: String,
        //picture_url:String
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
    updated_at: Date,
    created_at: Date,
    user_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Vendor', VendorSchema);