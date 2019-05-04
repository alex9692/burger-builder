import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-service";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};
	componentDidMount() {
		this.props.fetchOrder();
	}
	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map(order => {
				console.log(order);
				return (
					<Order
						key={order._id}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				);
			});
		}

		return <div>{orders}</div>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
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
