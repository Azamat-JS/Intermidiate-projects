/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *       properties:
 *         comment:
 *           type: string
 *           description: The content of the comment
 *           example: "This is a great car!"
 *         leftBy:
 *           type: string
 *           description: The ID of the user who left the comment
 *           example: "6543dcb5e12abf0034f5a67e"
 * 
 */

const { Router } = require("express");
const {
  createAnswer,
  getAllAnswers,
  getAllQuestions,
  writeQuestion,
} = require("../controllers/questionAndAnswer");
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");

const router = Router();

/**
 * @swagger
 * /answer:
 *   get:
 *     tags:
 *       - Answers
 *     summary: Get all answers
 *     description: Retrieves all answers left by admin.
 *     responses:
 *       200:
 *         description: A list of all answers
 *       500:
 *         description: Internal Server Error
 */
router.get("/answer", checkAdminToken, getAllAnswers);

/**
 * @swagger
 * /answer:
 *   post:
 *     tags:
 *       - Answers
 *     summary: Create a new answer
 *     description: Allows a logged-in admin to leave a answer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/answer/schemas/Answer'
 *     responses:
 *       201:
 *         description: Answer added successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post("/answer", checkAdminToken, createAnswer);

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - question
 *         - givenBy
 *       properties:
 *         question:
 *           type: string
 *           description: The question asked by the user
 *           minLength: 6
 *           maxLength: 500
 *         givenBy:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who asked the question
 */

/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get all questions
 *     description: Retrieves all questions asked by users.
 *     responses:
 *       200:
 *         description: A list of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal Server Error
 */
router.get("/question", tokenChecker, getAllQuestions);

/**
 * @swagger
 * /question:
 *   post:
 *     tags:
 *       - Questions
 *     summary: Ask a new question
 *     description: Allows a logged-in user to ask a question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question was sent successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post("/question", tokenChecker, writeQuestion);


module.exports = router;
