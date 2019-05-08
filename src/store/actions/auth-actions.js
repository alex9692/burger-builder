import * as actionTypes from "./actionTypes";
import axios from "../../axios-service";
import { bake_cookie, delete_cookie, read_cookie } from "sfcookies";
import jwt from "jsonwebtoken";

const registerStart = () => {
	return {
		type: actionTypes.REGISTER_START
	};
};

const registerSuccess = () => {
	return {
		type: actionTypes.REGISTER_SUCCESS
	};
};

const registerFail = error => {
	return {
		type: actionTypes.REGISTER_FAIL,
		error
	};
};

export const registerFinish = () => {
	return {
		type: actionTypes.REGISTER_OVER
	};
};

export const register = registerData => dispatch => {
	dispatch(registerStart());
	return axios
		.post("/auth/register", registerData)
		.then(response => {
			console.log(response);
			dispatch(registerSuccess());
		})
		.catch(error => {
			console.log(error.response.data);
			dispatch(registerFail(error.response.data));
		});
};

const signInStart = () => {
	return {
		type: actionTypes.SIGN_IN_START
	};
};

const signInSuccess = token => {
	return {
		type: actionTypes.SIGN_IN_SUCCESS,
		token
	};
};

const signInFail = error => {
	return {
		type: actionTypes.SIGN_IN_FAIL,
		error
	};
};

const autoLogout = expTime => dispatch => {
	setTimeout(() => {
		dispatch(signOut());
	}, expTime);
};

export const auth = authData => dispatch => {
	dispatch(signInStart());
	return axios
		.post("/auth/signIn", authData)
		.then(response => {
			const token = response.data.token;
			const expirationTime = jwt.decode(token).exp * 1000;
			const timeToLogout = expirationTime - Date.now();
			bake_cookie(actionTypes.COOKIE_KEY, token);
			dispatch(signInSuccess(token));
			dispatch(autoLogout(timeToLogout));
		})
		.catch(error => {
			console.log(error.response);
			dispatch(signInFail(error.response.data));
		});
};

export const signInOver = () => {
	return {
		type: actionTypes.SIGN_IN_OVER
	};
};

export const signOut = () => {
	delete_cookie(actionTypes.COOKIE_KEY);
	return {
		type: actionTypes.SIGN_OUT
	};
};

export const checkAuthOnStartUp = () => dispatch => {
	const token = read_cookie(actionTypes.COOKIE_KEY);
	if (token.length) {
		const expirationTime = jwt.decode(token).exp * 1000;
		const timeNow = Date.now();
		if (timeNow > expirationTime) {
			dispatch(signOut());
		} else {
			const timeToLogout = expirationTime - timeNow;
			dispatch(signInSuccess(token));
			dispatch(autoLogout(timeToLogout));
		}
	}
};
