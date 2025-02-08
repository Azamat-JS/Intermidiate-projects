const router = require('express').Router()
const {getProfile, updateProfile, deleteProfile} = require('../controllers/profil')
const { tokenChecker } = require('../middleware/checkToken')
const ImageUpload = require('../utils/multer')

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *         - verification_code
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password (hashed)
 *         role:
 *           type: string
 *           enum: ["user", "admin"]
 *           description: The role of the user
 *         verification_code:
 *           type: number
 *           description: The verification code for account confirmation
 *         isVerify:
 *           type: boolean
 *           default: false
 *           description: Indicates if the user is verified
 *         image:
 *           type: string
 *           description: The URL of the user's profile picture
 *       example:
 *         id: 60d21b96ee684f8f6f499123
 *         username: "JohnDoe"
 *         email: "johndoe@example.com"
 *         password: "$2b$10$X..." 
 *         role: "user"
 *         verification_code: 123456
 *         isVerify: true
 *         image: "https://example.com/profile.jpg"
 *
 * /profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized (User must be logged in)
 *
 * /updateProfile:
 *   put:
 *     summary: Update the authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "NewUsername"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newemail@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request (Missing fields)
 *       401:
 *         description: Unauthorized (User must be logged in)
 *       404:
 *         description: User not found
 *
 * /deleteProfile:
 *   delete:
 *     summary: Delete the authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized (User must be logged in)
 *       404:
 *         description: Profile not found
 */


router.get('/profile', tokenChecker, getProfile)
router.put('/updateProfile', tokenChecker, ImageUpload.singleImage, updateProfile)
router.delete('/deleteProfile', tokenChecker, deleteProfile)

module.exports = router

