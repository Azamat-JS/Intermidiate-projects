const Comment = require('../models/comments');
const Book = require('../models/book')
const Auth = require('../models/auth')

const getAllComments = async (req, res) => {
    try {
      const comments = await Comment.find({});
  
      if (!comments || comments.length === 0) {
        return res.status(404).json({ msg: "No comments found" });
      }
  
      const commentsWithDetails = await Promise.all(
        comments.map(async (comment) => {
          const user = await Auth.findById(comment.user_info);
          const book = await Book.findById(comment.bookId);
  
          return {
            ...comment._doc,
            user: user ? { _id: user._id, username: user.username } : null,
            book: book ? { _id: book._id, name: book.name } : null,
          };
        })
      );
  
      console.log(commentsWithDetails[0]?.book); // ✅ Logging first book
  
      // ✅ Correctly extracting comment texts
      const allComments = commentsWithDetails.map((item) => item.comment);
  
      res.status(200).json({
        comments: allComments, // ✅ Use mapped comments
        about: commentsWithDetails[0]?.book?.name || "Unknown Book", // ✅ Avoid undefined error
        leftBy: commentsWithDetails[0]?.user?.username || "Unknown User", // ✅ Avoid undefined error
        number: comments.length, // ✅ Send number of comments
      });
    } catch (error) {
      console.error("Error in getAllComments:", error);
      res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
  };
  
  

const createComment = async (req, res) => {
    req.body.user_info = req.user.userId
    const comment = await Comment.create(req.body);
    res.status(201).json({
        msg: "comment added successfully",
        comment});
};

module.exports = {createComment, getAllComments}