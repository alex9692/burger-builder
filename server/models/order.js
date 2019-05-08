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
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("Order", orderSchema);
