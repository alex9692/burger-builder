const Ingredients = require("../models/ingredient");

exports.getIngredients = function(req, res) {
	Ingredients.find({})
		.select("-__v")
		.exec()
		.then(response => {
			return res.json(response);
		})
		.catch(err => {
			return res.json(err);
		});
};
