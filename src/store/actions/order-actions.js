import * as actionTypes from "./actionTypes";
import axios from "../../axios-service";
import { read_cookie } from "sfcookies";
import jwt from "jsonwebtoken";

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
			// history.push("/");
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
	const token = read_cookie(actionTypes.COOKIE_KEY);
	const userId = jwt.decode(token).userId;
	dispatch(fetchOrdersInit());
	return axios
		.get(`/orders/${userId}`)
		.then(response => {
			const orders = response.data;
			console.log(orders);
			dispatch(fetchOrdersSuccess(orders));
		})
		.catch(error => {
			console.log(error.data);
			dispatch(fetchOrdersFail(error));
		});
};

export const purchaseEnd = () => {
	return {
		type: actionTypes.PURCHASE_END
	};
};
