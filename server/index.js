const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const FakeDB = require("./fakeDB");
const igList = require("./routes/ingredient");
const ordersList = require("./routes/orders");

// const fakeDB = new FakeDB();
// fakeDB.seeDb();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use(cors());
// app.use((req, res, next) => {
// 	res.setHeader("Allow-Access-Cross-Origin", "*");
// 	res.setHeader("Allow-Access-Cross-Methods", "GET, POST, PUT, PATCH, DELETE");
// 	res.setHeader("Allow-Access-Cross-Headers", "Content-Type, Authorization");
// 	next();
// });

app.use("/my-burger/ingredientList", igList);
app.use("/my-burger/orders", ordersList);

mongoose
	.connect("mongodb://localhost:27017/my-burger", { useNewUrlParser: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log("running in PORT: ", PORT);
		});
	})
	.catch(err => {
		console.log(err);
	});
