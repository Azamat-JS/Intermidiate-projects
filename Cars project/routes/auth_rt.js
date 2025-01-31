/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: User role
 *       example:
 *         username: Ali Usmonov
 *         email: azamatielts987@gmail.com
 *         password: azamat998877
 *         role: user
 */

const { Router } = require("express");
const router = Router();
const { register, verify, login, logOut } = require("../controllers/auth_ctr");
const {
  authValidate,
  verifyValidate,
  loginValidate,
} = require("../middleware/authValidMiddle");
const refresh = require("../middleware/refreshToken");

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Registers a new user and sends a verification code via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: Verification code sent to email
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", authValidate, register);

/**
 * @swagger
 * /verify:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify account with code
 *     description: Verifies a user with an email and verification code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: "example@gmail.com"
 *               code:
 *                 type: number
 *                 description: Verification code sent to email
 *                 example: 342123
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid verification code
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/verify", verifyValidate, verify);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in a user
 *     description: Logs in a user and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "azamatielts987@gmail.com"
 *               password:
 *                 type: string
 *                 example: "azamat998877"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 createtoken:
 *                   type: string
 *                   description: JWT access token
 *       400:
 *         description: Invalid credentials or unverified account
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", loginValidate, login);

/**
 * @swagger
 * /refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     description: Generates a new access token using the refresh token.
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       403:
 *         description: Invalid refresh token
 *       500:
 *         description: Internal Server Error
 */
router.post("/refresh", refresh);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log out a user
 *     description: Clears authentication cookies and logs out the user.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/logout", logOut);

module.exports = router;
