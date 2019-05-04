import * as actionTypes from "./actionTypes";
import axios from "../../axios-service";

const burgerOrderInit = () => {
	return {
		type: actionTypes.BURGER_ORDER_INIT
	};
};

const burgerOrderSuccess = (orderId, orderData) => {
	return {
		type: actionTypes.BURGER_ORDER_SUCCESS,
		orderId,
		orderData
	};
};

const burgerOrderFail = error => {
	return {
		type: actionTypes.BURGER_ORDER_FAIL,
		error
	};
};

export const burgerOrderStart = (orderData, history) => dispatch => {
	dispatch(burgerOrderInit());
	return axios
		.post("/orders", orderData)
		.then(response => {
			const id = response.data._id;
			delete response.data.__v;
			delete response.data._id;
			dispatch(burgerOrderSuccess(id, response.data));
			// history.push("/");
		})
		.catch(err => {
			console.log(err);
			dispatch(burgerOrderFail(err));
			history.push("/");
		});
};

const fetchOrdersInit = () => {
	return {
		type: actionTypes.FETCH_ORDERS_INIT
	};
};

const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
};

const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error
	};
};

export const fetchOrders = () => dispatch => {
	dispatch(fetchOrdersInit());
	return axios
		.get("/orders")
		.then(response => {
			const orders = response.data;
			console.log(orders);
			dispatch(fetchOrdersSuccess(orders));
		})
		.catch(err => {
			dispatch(fetchOrdersFail(err));
		});
};

export const purchaseEnd = () => {
	return {
		type: actionTypes.PURCHASE_END
	};
};
