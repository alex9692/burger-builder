const express = require("express");
const router = express.Router();

const ingredientCtrl = require("../controllers/ingredient");

router.get("/", ingredientCtrl.getIngredients);

module.exports = router;
