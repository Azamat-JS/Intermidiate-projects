
const {Router} = require('express');
const router = Router()
const {register, verify, login, refresh, logOut} = require('../controllers/auth_ctr')
const {authValidate, verifyValidate, loginValidate} = require('../middleware/authValidMiddle');


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
 *         - verification_code
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: Role of the user
 *         verification_code:
 *           type: number
 *           description: Verification code for email verification
 *         isVerify:
 *           type: boolean
 *           default: false
 *           description: Indicates if the user is verified
 *         image:
 *           type: string
 *           description: URL of the user's profile image
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists or validation error
 */

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify a user with a code
 *     tags: [Auth]
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
 *                 description: User's email
 *               code:
 *                 type: number
 *                 description: Verification code received via email
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid code or user not found
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
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
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials or user not verified
 */

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh authentication token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New authentication token generated
 *       404:
 *         description: Refresh token not found
 *       401:
 *         description: Invalid refresh token
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

router.post('/register', authValidate, register)

router.post('/verify',verifyValidate, verify)

router.post('/login', loginValidate, login)

router.post('/refresh', refresh)

router.post('/logout', logOut)

module.exports = router