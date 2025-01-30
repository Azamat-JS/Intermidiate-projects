const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Please enter a comment"],
        min: [6, "Comment must be at least 6 characters"],
        max: [55, "Comment must be at most 55 characters"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: [true, "User must be provided"]
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
        required: [true, "Book must be provided"]
    },
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Comment", CommentSchema)