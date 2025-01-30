/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *         - user
 *         - book
 *       properties:
 *          comment:
 *           type: string
 *           description: Leave a comment
 *          user:
 *            type:  mongoose.Types.ObjectId
 *            description: The user's id must be provided
 *          book:
 *            type: mongoose.Types.ObjectId
 *            description: Id of the book required
 *       example:
 *         comment: "I liked the library app"
 *         user: "LKJl345kjjlkjsad87234"
 *         book: "aslLKJs234LKLJj89asdf"
 */

const {Router} = require('express')
const router = Router()

const {createComment, getAllComments} = require('../controllers/comments')

/**
 * @swagger
 * /comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Write comments
 *     description: Write more comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "It is the best app I've ever seen"
 *               user:
 *                 type: string
 *                 example: "LKJl345kjjlkjsad87234"
 *               book:
 *                 type: string
 *                 example: "aslLKJs234LKLJj89asdf"
 *             required:
 *               - comment
 *               - user
 *               - book
 *     responses:
 *       201:
 *         description: Comment was added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get all comments
 *     description: get all comments. without accessToken.
 *     responses:
 *       200:
 *         description: Comment was added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       500:
 *         description: Internal Server Error
 */
router.route('/comment').get(getAllComments).post(createComment)

module.exports = router