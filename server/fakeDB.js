const Ingredients = require("./models/ingredient");

const fakeDBData = require("./data.json");

class FakeDb {
	constructor() {
		this.ingredients = fakeDBData.ingredients;
	}

	async cleanDB() {
		await Ingredients.remove();
	}

	pushDataToDB() {
		const ingredients = new Ingredients(this.ingredients);

		ingredients.save();
	}

	async seeDb() {
		await this.cleanDB();
		this.pushDataToDB();
	}
}

module.exports = FakeDb;
