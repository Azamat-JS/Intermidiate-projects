const Comment = require('../models/comments');
const Question = require('../models/questionSchema')

const getAllQuestions = async(req, res) => {
    const questions = await Question.find().sort('createdAt')
    res.status(200).json(questions)
}

const writeQuestion = async(req, res) => {
    req.body.givenBy = req.user.userId;
    const question = await Question.create(req.body);
    res.status(201).json({ question, message: 'Question was sent successfully' });
}

const getAllComments = async(req, res) => {
    const comments = await Comment.find().sort('createdAt')
    res.status(200).json({comments: comments, number: comments.length})
}

const createComment = async (req, res) => {
    req.body.leftBy = req.user.userId;
    const comment = await Comment.create(req.body);
    res.status(201).json({
        msg: "comment added successfully",
        comment});
};


module.exports = {createComment, getAllComments, getAllQuestions, writeQuestion}