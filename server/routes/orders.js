const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/orders.js");

router.get("/", orderCtrl.getOrders);

router.post("/", orderCtrl.postOrder);

module.exports = router;
