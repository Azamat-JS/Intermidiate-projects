const Answer = require('../models/answer');
const Question = require('../models/questionSchema')
const logger = require('../service/logger')

const getAllQuestions = async(req, res) => {
    const questions = await Question.find().sort('createdAt').populate('givenBy', '-_id, username')
    res.status(200).json(questions)
}

const writeQuestion = async(req, res) => {
    req.body.givenBy = req.user.userId;
    const question = await Question.create(req.body);
    logger.info(`New question: ${req.body.question}`)
    res.status(201).json({ question, message: 'Question was sent successfully' });
}

const getAllAnswers = async(req, res) => {
    const comments = await Answer.find().sort('createdAt').populate('answeredBy', '-_id, username')
    res.status(200).json({comments: comments, number: comments.length})
}

const createAnswer = async (req, res) => {
    req.body.answeredBy = req.user.userId;
    const comment = await Answer.create(req.body);
    res.status(201).json({
        msg: "comment added successfully",
        comment});
};


module.exports = {createAnswer, getAllAnswers, getAllQuestions, writeQuestion}