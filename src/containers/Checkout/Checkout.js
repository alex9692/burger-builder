import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions";

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};
	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		let summary = null;
		if (!this.props.ingredients) {
			this.props.history.replace("/");
		} else {
			let redirect = null;
			if (this.props.purchased) {
				this.props.onPurchaseEnd();
				redirect = <Redirect to="/" />;
			}
			summary = (
				<div>
					{redirect}
					<CheckoutSummary
						ingredients={this.props.ingredients}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
						path={this.props.match.url + "/contact-data"}
						component={ContactData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		purchased: state.order.purchased
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onPurchaseEnd: () => dispatch(actions.purchaseEnd())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Checkout);
