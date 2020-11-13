const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    },
    ratings: [{
        summary: String,
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        numberOfStars: Number,
        created: {
            type: Date,
            default: Date.now
        }
    }],
    img: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
    },
    tag: String
});

module.exports = mongoose.model('MenuItem', ItemSchema);