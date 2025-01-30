const { Router } = require("express");
const router = Router();

const statistics = require("../controllers/main");

router.get("/", statistics);

module.exports = router;