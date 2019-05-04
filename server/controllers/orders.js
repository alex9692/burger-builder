const Order = require("../models/order");

exports.postOrder = function(req, res, next) {
	const {
		ingredients,
		price,
		orderData: { name, street, zipcode, country, email, deliveryMethod }
	} = req.body;

	const order = new Order({
		ingredients,
		price,
		orderData: { name, street, zipcode, country, email, deliveryMethod }
	});

	order
		.save()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(422).send({ errors: err });
		});
};

exports.getOrders = function(req, res, next) {
	Order.find({})
		.select("-__v")
		.exec()
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			return res.status(422).send(err);
		});
};
