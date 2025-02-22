const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Please enter a comment"],
        min: [6, "Comment must be at least 6 characters"],
        max: [55, "Comment must be at most 55 characters"],
    },
    user_info: {
        type: String,
    },
    book_info: {
        type: String,
    },
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Comment", CommentSchema)