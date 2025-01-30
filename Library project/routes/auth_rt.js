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
 *       example:
 *         username: Ali Usmonov
 *         email: admin@gmail.com
 *         password: example1243
 *         role: user
 */

const {Router} = require('express');
const router = Router()
const {register, verify, login, refresh, logOut} = require('../controllers/auth_ctr')
const {authValidate, verifyValidate, loginValidate} = require('../middleware/authValidMiddle');


/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Auth:
 *     summary: Register a new user
 *     description: Registers a new user with full name, email, and password. Requires accessToken in cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "The username of the user."
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: "The email of the user."
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 description: "The password for the user."
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 description: "The role for the user"
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Registered!
 *       400:
 *         description: User already exists!, Bad Request, validation errors
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', authValidate, register)


/**
 * @swagger
 * /verify:
 *   post:
 *     tags:
 *       - Auth:
 *     summary: Verify code
 *     description: Verifies a user with email and code, and activates the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user to verify.
 *                 example: "example@gmail.com"
 *               code:
 *                 type: string
 *                 description: The verification code sent to the user.
 *                 example: "342123"
 *             required:
 *               - email
 *               - code
 *     responses:
 *       201:
 *         description: Verification successful and user activated.
 *       400:
 *         description: Invalid verification code.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/verify',verifyValidate, verify)


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth:
 *     summary: Login to the system
 *     description: Logs in a user with full name and password, and returns access & refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "azamatielts987@gmail.com"
 *               password:
 *                 type: string
 *                 example: "azamat998877"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Successfully Logged in! and tokens returned
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
 *                 result:
 *                   type: string
 *                   description: JWT access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwI..."
 *       400:
 *         description: Bad Request, Wrong password or unaccepted verification code!
 *       404:
 *         description: User not found!
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', loginValidate, login)

/**
 * @swagger
 * /refresh:
 *   post:
 *     tags:
 *       - Auth:
 *     summary: Refresh the existed token
 *     description: Refresh token to change the access token from time to time.
 *     responses:
 *       201:
 *         description: Successfully refreshed! and access token was changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       500:
 *         description: Internal Server Error
 */

router.post('/refresh', refresh)

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Auth:
 *     summary: Logout from the system
 *     description: Refresh token and access token will be cleared from cookies.
 *     responses:
 *       200:
 *         description: Successfully Logged out! and tokens were cleared
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       500:
 *         description: Internal Server Error
 */

router.post('/logout', logOut)

module.exports = router