const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth.js");

router.get("/test", authCtrl.authMiddleware, (req, res, next) => {
	res.json({ message: "working auth middleware" });
});

router.post("/signIn", authCtrl.auth);

router.post("/register", authCtrl.register);

module.exports = router;
