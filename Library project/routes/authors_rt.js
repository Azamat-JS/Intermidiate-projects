/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - birth_year
 *       properties:
 *         name:
 *           type: string
 *           description: Author's full name
 *         birth_year:
 *           type: number
 *           description: Author's birth_date
 *         death_year:
 *           type: number
 *           description: Author's death
 *         nation:
 *           type: string
 *           description: Author's country
 *       example:
 *         name: Ali Usmonov
 *         birth_year: 1920
 *         death_year: 1982
 *         nation: Uzbek
 */


const {Router} = require('express')
const { getAllAuthors, addAuthor, search, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors')
const { authorValidate } = require('../middleware/authorValidMiddl')
const router = Router()
const {checkAdminToken, tokenChecker} = require('../middleware/checkToken')


/**
 * @swagger
 * /get_authors:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get all authors
 *     description: get all authors. with accessToken.
 *     responses:
 *       500:
 *         description: Internal Server Error
 */

router.get('/get_authors',tokenChecker, getAllAuthors)

/**
 * @swagger
 * /get_one_author/{name}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get author by name
 *     description: Retrieves an author's details using a case-insensitive name match.
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Name of the author to search for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved author details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the author
 *                 name:
 *                   type: string
 *                   description: Name of the author
 *                 birth_year:
 *                   type: number
 *                   description: Birth year of the author
 *                 death_year:
 *                   type: number
 *                   description: Death year of the author
 *                 nation:
 *                   type: string
 *                   description: Nation of the author
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Created time of the author
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Updated time of the author
 *       '404':
 *         description: Author not found
 *       '500':
 *         description: Internal Server Error
 */


router.get('/get_one_author/:name',tokenChecker, getAuthor)

/**
 * @swagger
 * /get_authors/search:
 *   get:
 *     tags:
 *       - Author
 *     summary: Searching author
 *     description: Get user without accessToken.
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Filter authors by their name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get('/get_authors/search',tokenChecker, search)

/**
 * @swagger
 * /add_author:
 *   post:
 *     tags:
 *       - Author
 *     summary: Add a new author
 *     description: You are adding a new author.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hamid Olimov"
 *               birth_year:
 *                 type: integer
 *                 example: 1966
 *               death_year:
 *                 type: integer
 *                 example: 2017
 *               nation:
 *                 type: string
 *                 example: "Uzbek"
 *             required:
 *               - name
 *               - birth_year
 *               - nation
 *     responses:
 *       201:
 *         description: Added a new author
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
 *                   example: "Successfully added"
 *       400:
 *         description: Provide all the required fields!
 *       500:
 *         description: Internal Server Error
 */
router.post('/add_author', [authorValidate, checkAdminToken], addAuthor)

/**
 * @swagger
 * /update_author/{id}:
 *   put:
 *     tags:
 *       - Author
 *     summary: Update author's data by their ID
 *     description: You will update author's data by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hamid Olimov"
 *               birth_year:
 *                 type: integer
 *                 example: 1966
 *               death_year:
 *                 type: integer
 *                 example: 2017
 *               nation:
 *                 type: string
 *                 example: "Uzbek"
 *     responses:
 *       201:
 *         description: Updated an author
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
 *                   example: "Successfully updated"
 *       400:
 *         description: Provide correct id!
 *       500:
 *         description: Internal Server Error
 */
router.put('/update_author/:id',checkAdminToken, updateAuthor)


/**
 * @swagger
 * /delete_author/{id}:
 *   delete:
 *     tags:
 *       - Author
 *     summary: Deletes author by their ID
 *     description: Delete author by ID
 *     operationId: deleteAuthor
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Author id to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully
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
 *                   example: "Successfully deleted"
 *       400:
 *         description: Provide correct id!
 *       500:
 *         description: Internal Server Error
 */
router.delete('/delete_author/:id', checkAdminToken, deleteAuthor)

module.exports = router