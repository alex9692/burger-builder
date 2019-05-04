import * as actionTypes from "./actionTypes";
import axios from "../../axios-service";

const setIngredientsSuccess = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS_SUCCESS,
		ingredients
	};
};

const setIngredientsFail = error => {
	return {
		type: actionTypes.SET_INGREDIENTS_FAIL,
		error
	};
};

export const getIngredients = () => dispatch => {
	return axios
		.get("/ingredientList")
		.then(response => {
			// const id = response.data[0]._id;
			// delete response.data[0]._id;
			const ingredients = response.data[0];
			// const totalPrice = Object.keys(ingredients)
			// 	.map(igKey => {
			// 		return ingredients[igKey];
			// 	})
			// 	.reduce((acc, cur, index) => {
			// 		return acc + Object.values(INGREDIENT_PRICES)[index] * cur;
			// 	}, this.state.totalPrice);
			// this.setState({ ingredients, ingredientId: id, totalPrice });
			// this.updatePurchaseState(ingredients);
			dispatch(setIngredientsSuccess(ingredients));
		})
		.catch(err => {
			console.log(err);
			dispatch(setIngredientsFail(err));
		});
};

export const addIngredient = ingType => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingType
	};
};

export const removeIngredient = ingType => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingType
	};
};
