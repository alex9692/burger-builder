import * as actionTypes from "../actions/actionTypes";

const initialState = {
	orders: [],
	error: false,
	loading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.BURGER_ORDER_INIT:
			return {
				...state,
				loading: true,
				error: false
			};
		case actionTypes.BURGER_ORDER_SUCCESS:
			return {
				...state,
				// orders: state.orders.concat({
				// 	...action.orderData,
				// 	_id: action.orderId
				// }),
				loading: false,
				purchased: true
			};
		case actionTypes.BURGER_ORDER_FAIL:
			return {
				...state,
				loading: false,
				error: true
			};
		case actionTypes.FETCH_ORDERS_INIT:
			return {
				...state,
				loading: true,
				error: false
			};
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false
			};
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
				error: true
			};
		case actionTypes.PURCHASE_END:
			return {
				...state,
				purchased: false
			};
		default:
			return state;
	}
};

export default reducer;
