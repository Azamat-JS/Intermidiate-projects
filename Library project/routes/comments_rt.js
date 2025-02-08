
const {Router} = require('express')
const router = Router()

const {createComment, getAllComments, updateComment, deleteComment} = require('../controllers/comments')
const {tokenChecker} = require('../middleware/checkToken')

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *         - user_info
 *         - book_info
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the comment
 *         comment:
 *           type: string
 *           description: The comment text
 *           minLength: 6
 *           maxLength: 55
 *         user_info:
 *           type: string
 *           description: The username of the person who made the comment
 *         book_info:
 *           type: string
 *           description: The name of the book the comment is associated with
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the comment was last updated
 *       example:
 *         id: 60d21b96ee684f8f6f499123
 *         comment: "This book was amazing!"
 *         user_info: "JohnDoe"
 *         book_info: "War and Peace"
 *         createdAt: "2023-02-08T12:34:56Z"
 *         updatedAt: "2023-02-08T12:34:56Z"
 *
 * /comment:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - book_info
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Great book!"
 *               book_info:
 *                 type: string
 *                 example: "60d21b96ee684f8f6f499abc"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input
 *
 * /comment/{commentId}:
 *   put:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */


router.route('/comment').get(getAllComments).post(tokenChecker, createComment)
router.route('/comment/:commentId').put(tokenChecker, updateComment).delete(tokenChecker, deleteComment)

module.exports = router