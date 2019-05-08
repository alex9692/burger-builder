import axios from "axios";
import { read_cookie } from "sfcookies";
import { COOKIE_KEY } from "./store/actions/actionTypes";

const instance = axios.create({
	baseURL: "http://localhost:3001/my-burger"
});

instance.interceptors.request.use(req => {
	const token = read_cookie(COOKIE_KEY);
	if (token.length) {
		req.headers.authorization = `Bearer ${token}`;
	}
	return req;
});

export default instance;
