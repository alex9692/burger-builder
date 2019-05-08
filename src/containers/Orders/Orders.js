import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Order from "../../components/Order/Order";
import axios from "../../axios-service";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";

class Orders extends Component {
	componentDidMount() {
		this.props.fetchOrder();
	}
	render() {
		let orders = <Spinner />;
		let redirect = null;
		if (!this.props.isAuth) {
			redirect = <Redirect to="/" />;
		}
		if (!this.props.loading) {
			orders = this.props.orders.map(order => {
				return (
					<Order
						key={order._id}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				);
			});
		}

		return (
			<div>
				{redirect}
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		isAuth: state.auth.isAuth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrder: () => dispatch(actions.fetchOrders())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
