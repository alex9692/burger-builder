import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7
};

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: 4,
				error: false,
				building: false
			};
		case actionTypes.SET_INGREDIENTS_FAIL:
			return {
				...state,
				error: true,
				building: false
			};
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingType]: state.ingredients[action.ingType] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType],
				building: true
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingType]: state.ingredients[action.ingType] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType],
				building: true
			};
		default:
			return state;
	}
};

export default reducer;
