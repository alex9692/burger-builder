import * as actionTypes from "../actions/actionTypes";

const initialState = {
	isRegistered: false,
	loading: false,
	error: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGISTER_START:
			return {
				...state,
				isRegistered: false,
				loading: true,
				error: false
			};
		case actionTypes.REGISTER_SUCCESS:
			return {
				...state,
				isRegistered: true,
				loading: false
			};
		case actionTypes.REGISTER_FAIL:
			return {
				...state,
				isRegistered: false,
				loading: false,
				error: action.error
			};
		case actionTypes.REGISTER_OVER:
			return {
				...state,
				isRegistered: false,
				loading: false,
				error: false
			};
		default:
			return state;
	}
};

export default reducer;
