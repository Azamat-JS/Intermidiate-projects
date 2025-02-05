const Comment = require('../models/comments');

const getAllComments = async(req, res) => {
    const comments = await Comment.find({})
    res.status(200).json({comments: comments, number: comments.length})
}

const createComment = async (req, res) => {
    req.body.user_info = req.user.userId
    const comment = await Comment.create(req.body);
    res.status(201).json({
        msg: "comment added successfully",
        comment});
};

module.exports = {createComment, getAllComments}