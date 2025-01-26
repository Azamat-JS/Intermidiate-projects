const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Please enter a comment"],
        min: [6, "Comment must be at least 6 characters"],
        max: [550, "Comment must be at most 550 characters"],
    },
    leftBy: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
        required: [true, "User must be provided"]
    }
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Comment", commentSchema)