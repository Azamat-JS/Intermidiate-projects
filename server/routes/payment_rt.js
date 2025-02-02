const express = require("express");
const router = express.Router();

const { createPayment, getPayments } = require("../controllers/payments");

router.route("/payments").get(getPayments).post(createPayment);

module.exports = router;