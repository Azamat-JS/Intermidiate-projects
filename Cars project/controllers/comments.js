const Comment = require('../models/comments');


const createComment = async (req, res) => {
    const comment = await Comment.create({ ...req.body });
    res.status(201).json({
        msg: "comment added successfully",
        comment});
};

module.exports = createComment