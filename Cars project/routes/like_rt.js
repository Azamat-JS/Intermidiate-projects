/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - userId
 *         - carId
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who is liking or unliking a car
 *           example: "6543dcb5e12abf0034f5a67e"
 *         carId:
 *           type: string
 *           description: The ID of the car being liked or unliked
 *           example: "65a23b8de12cba0045d2f99f"
 */

const { Router } = require("express");
const pressLike = require("../controllers/likes");

const router = Router();

/**
 * @swagger
 * /like:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Like or Unlike a Car
 *     description: Allows a user to like a car or unlike it if they had already liked it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       201:
 *         description: Liked successfully
 *       200:
 *         description: Unliked successfully
 *       400:
 *         description: User ID and Car ID are required
 *       500:
 *         description: Internal server error
 */
router.post("/like", pressLike);

module.exports = router;
