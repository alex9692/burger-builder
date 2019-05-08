const express = require("express");
const router = express.Router();

const orderCtrl = require("../controllers/orders.js");
const authCtrl = require("../controllers/auth");

router.get("/:id", authCtrl.authMiddleware, orderCtrl.getOrders);

router.post("/", authCtrl.authMiddleware, orderCtrl.postOrder);

router.post("/delete", authCtrl.authMiddleware, orderCtrl.deleteOrder);

module.exports = router;
