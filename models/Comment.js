const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },

    order_id: {
        type: mongoose.Types.ObjectId,
        ref: 'orders'
    },
    comment_text: String,
    is_Complaint: Boolean,
    is_Praise: Boolean,
    date: Date

});


module.exports = mongoose.model('comments', CommentSchema);