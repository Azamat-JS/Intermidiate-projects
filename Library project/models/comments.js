const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Please enter a comment"],
        min: [6, "Comment must be at least 6 characters"],
        max: [55, "Comment must be at most 55 characters"],
    },
    user_info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "User must be provided"]
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "book id must be provided"]
    },
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Comment", CommentSchema)