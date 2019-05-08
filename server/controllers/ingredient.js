const Ingredients = require("../models/ingredient");

exports.getIngredients = function(req, res) {
	Ingredients.find({})
		.select("-_id -__v")
		.exec()
		.then(response => {
			return res.json(response);
		})
		.catch(error => {
			return res.status(404).send({ error: "Ingredients can't be loaded" });
		});
};
