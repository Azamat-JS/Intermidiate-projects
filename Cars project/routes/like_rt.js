const { Router } = require("express");
const pressLike = require("../controllers/likes");
const {tokenChecker} = require('../middleware/checkToken')

const router = Router();

router.post("/like", tokenChecker, pressLike);

module.exports = router;
