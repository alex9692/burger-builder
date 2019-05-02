import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-service";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get("/orders")
			.then(response => {
				const orders = response.data;
				this.setState({ loading: false, orders: orders });
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	}
	render() {
		let orders = <Spinner />;
		if (!this.state.loading) {
			orders = this.state.orders.map((order, index) => {
				return (
					<Order
						key={index}
						ingredients={order.ingredients}
						price={+order.price}
					/>
				);
			});
		}

		return <div>{orders}</div>;
	}
}

export default withErrorHandler(Orders, axios);
