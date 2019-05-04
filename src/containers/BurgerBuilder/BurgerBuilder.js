import React, { Component } from "react";
import axios from "../../axios-service";
import { connect } from "react-redux";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";

const INGREDIENT_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.getIngredients();
	}

	updatePurchaseState = updatedIngredient => {
		const ingredients = {
			...updatedIngredient
		};

		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, quantity) => {
				return sum + quantity;
			}, 0);

		return sum > 0;
	};

	addIngredient = type => {
		const oldCount = this.props.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;
		const priceAdd = INGREDIENT_PRICES[type];
		const oldPrice = this.props.totalPrice;
		const newPrice = oldPrice + priceAdd;

		this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredient);
	};

	deleteIngredient = type => {
		const oldCount = this.props.ingredients[type];
		if (oldCount > 0) {
			const updatedCount = oldCount - 1;
			const updatedIngredient = {
				...this.state.ingredients
			};
			updatedIngredient[type] = updatedCount;
			const priceDeduct = INGREDIENT_PRICES[type];
			const oldPrice = this.props.totalPrice;
			const newPrice = oldPrice - priceDeduct;

			this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
			this.updatePurchaseState(updatedIngredient);
		}
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onPurchase();
		this.props.history.push({ pathname: "/checkout" });
	};

	render() {
		const disabledInfo = {
			...this.props.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = !(disabledInfo[key] > 0);
		}

		let orderSummary = null;

		let burger = this.props.error ? (
			<h3 style={{ textAlign: "center" }}>Ingredient's can't be loaded</h3>
		) : (
			<Spinner />
		);

		if (this.props.ingredients) {
			burger = (
				<Auxillary>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.addIngredient}
						ingredientRemoved={this.props.removeIngredient}
						disabled={disabledInfo}
						totalPrice={this.props.totalPrice}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
						purchasing={this.purchaseHandler}
					/>
				</Auxillary>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					totalPrice={this.props.totalPrice}
				/>
			);
		}

		return (
			<Auxillary>
				<Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxillary>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice,
		error: state.burger.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getIngredients: () => dispatch(actions.getIngredients()),
		addIngredient: ingType => dispatch(actions.addIngredient(ingType)),
		removeIngredient: ingType => dispatch(actions.removeIngredient(ingType)),
		onPurchase: () => dispatch(actions.purchaseEnd())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
