const mongoose = require('mongoose');


//connect to db

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
const Comment = mongoose.model('comments', CommentSchema);

const makecomment = async() => {
    const comment = new Comment({
        user_id: '5fa6aaf1d4cfc654ecc5e47b',
        order_id: '6032afa2ee0f715624dfc60d',
        is_Praise: true,
        is_Complaint: false,
        date: new Date(),
        comment_text: 'Good product keep it up'

    })

    const res = await comment.save()
    console.log(res)
}

makecomment();