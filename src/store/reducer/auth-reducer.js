import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	isAuth: false,
	signInOver: false,
	loading: false,
	error: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SIGN_IN_START:
			return {
				...state,
				token: null,
				isAuth: false,
				loading: true,
				error: false
			};
		case actionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				token: action.token,
				isAuth: true,
				signInOver: true,
				loading: false
			};
		case actionTypes.SIGN_IN_FAIL:
			return {
				...state,
				token: null,
				isAuth: false,
				loading: false,
				error: action.error
			};
		case actionTypes.SIGN_IN_OVER:
			return {
				...state,
				signInOver: false,
				loading: false,
				error: false
			};
		case actionTypes.SIGN_OUT:
			return {
				...state,
				token: null,
				isAuth: false
			};
		default:
			return state;
	}
};

export default reducer;
