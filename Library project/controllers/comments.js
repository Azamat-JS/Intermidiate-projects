const Comment = require("../models/comments");
const Book = require("../models/book");
const Auth = require("../models/auth");
const BaseError = require('../errors/base_error')

const createComment = async (req, res) => {
  const user = await Auth.findById(req.user.userId);
  const { comment, book_info, user_info } = req.body;
  const book = await Book.findById(book_info);
  const newComment = await Comment.create({
    comment,
    book_info: book.name,
    user_info: user.username,
  });
  res.status(201).json({
    msg: "comment added successfully",
    newComment,
  });
};

const getAllComments = async (req, res) => {
  const allComments = await Comment.find({});
  res.status(200).json(allComments);
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const editedComment = await Comment.findByIdAndUpdate(
    commentId,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({message: 'Your comment updated successfully', editedComment})
};

const deleteComment = async (req, res, next) => {
  const {commentId} = req.params
  const removedComment = await Comment.findByIdAndDelete(commentId)
  if(!removedComment){
   return next(BaseError.NotFoundError(`There is no comment with id: ${commentId}`))
  }
  res.status(200).json({message: 'Your comment deleted successfully'})
}


module.exports = { 
  createComment, 
  getAllComments,
  updateComment,
  deleteComment
};
