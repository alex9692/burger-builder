import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Register from "./containers/Register/Register";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						{this.props.isAuth ? (
							<Route path="/checkout" component={Checkout} />
						) : null}
						{this.props.isAuth ? (
							<Route path="/orders/:id" component={Orders} />
						) : null}
						<Route path="/auth" component={Auth} />
						<Route path="/register" component={Register} />
						<Route path="/logout" component={Logout} />
						<Route path="/" exact component={BurgerBuilder} />
						/>
						<Redirect to="/" />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth
	};
};
export default connect(mapStateToProps)(App);
