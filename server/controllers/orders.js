const Order = require("../models/order");
const User = require("../models/auth");

exports.postOrder = function(req, res, next) {
	const {
		ingredients,
		price,
		orderData: { name, street, zipcode, country, email, deliveryMethod }
	} = req.body;

	const user = res.locals.user;

	const order = new Order({
		user,
		ingredients,
		price,
		orderData: { name, street, zipcode, country, email, deliveryMethod }
	});

	order
		.save()
		.then(newOrder => {
			return newOrder;
		})
		.then(newOrder => {
			User.findByIdAndUpdate(
				user._id,
				{ $push: { orders: newOrder } },
				{ new: true }
			)
				.then(result => {
					return res.status(200).json(result);
				})
				.catch(error => {
					return res.status(500).send({ error });
				});
		})
		.catch(err => {
			res.status(422).send({ error: err });
		});
};

exports.deleteOrder = function(req, res) {
	const { orderId } = req.body;

	const user = res.locals.user;

	Order.deleteOne({ _id: orderId })
		.then(result => {
			User.findByIdAndUpdate(
				user._id,
				{ $pull: { orders: orderId } },
				{ safe: true, upsert: true }
			)
				.then(result => {
					return res.status(200).send({ message: "deleted successfully" });
				})
				.catch(error => res.status(404).send({ error }));
		})
		.catch(error => res.status(422).send({ error }));
};

exports.getOrders = function(req, res, next) {
	const id = req.params.id;
	const user = res.locals.user;
	Order.where({user})
		.populate("orders")
		// .select("-__v")
		.exec()
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(error => {
			return res.status(422).send({ error });
		});
};
