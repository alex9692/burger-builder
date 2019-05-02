const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	ingredients: Object,
	price: {
		type: Number,
		default: 4
	},
	orderData: {
		name: String,
		street: String,
		zipcode: String,
		country: String,
		email: String,
		deliveryMethod: {
			type: String,
			default: "Fastest"
		}
	}
});

module.exports = mongoose.model("Orders", orderSchema);
