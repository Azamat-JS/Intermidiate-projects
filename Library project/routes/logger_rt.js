/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - timestamp
 *         - level
 *         - message
 *         - metadata
 *       properties:
 *          timestamp:
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
const getLogs = require('../controllers/logs')
const {checkAdminToken} = require('../middleware/checkToken')
const router = Router()


/**
 * @swagger
 * /logs:
 *   get:
 *     tags:
 *       - Log
 *     summary: Get all logs
 *     description: get all logs without accessToken.
 *     responses:
 *       500:
 *         description: Internal Server Error
 */
router.get('/logs', checkAdminToken, getLogs)

module.exports = router


