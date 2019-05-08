import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import burgerReducer from "./store/reducer/burger-reducer";
import orderReducer from "./store/reducer/order-reducer";
import authReducer from "./store/reducer/auth-reducer";
import registerReducer from "./store/reducer/register-reducer";
import * as actions from "./store/actions";

const rootReducer = combineReducers({
	burger: burgerReducer,
	order: orderReducer,
	auth: authReducer,
	register: registerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(actions.checkAuthOnStartUp());

const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.render(
	<Provider store={store}>{app}</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
