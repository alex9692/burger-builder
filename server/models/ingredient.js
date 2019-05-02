const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
	meat: {
		type: Number,
		default: 0
	},
	salad: {
		type: Number,
		default: 0
	},
	cheese: {
		type: Number,
		default: 0
	},
	bacon: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Ingredients", ingredientSchema);
