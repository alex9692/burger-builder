import React, { Component } from "react";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			meat: 0,
			salad: 0,
			cheese: 0,
			bacon: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

	updatePurchaseState = updatedIngredient => {
		const ingredients = {
			...updatedIngredient
		};

		const sum = Object.keys(ingredients)
			.map(igKeyy => {
				return ingredients[igKeyy];
			})
			.reduce((sum, quantity) => {
				return sum + quantity;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	};

	addIngredient = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredients
		};
		updatedIngredient[type] = updatedCount;
		const priceAdd = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAdd;

		this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredient);
	};

	deleteIngredient = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount > 0) {
			const updatedCount = oldCount - 1;
			const updatedIngredient = {
				...this.state.ingredients
			};
			updatedIngredient[type] = updatedCount;
			const priceDeduct = INGREDIENT_PRICES[type];
			const oldPrice = this.state.totalPrice;
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
		alert("Continue Shopping!!");
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = !(disabledInfo[key] > 0);
		}
		return (
			<Auxillary>
				<Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						totalPrice={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredient}
					ingredientRemoved={this.deleteIngredient}
					disabled={disabledInfo}
					totalPrice={this.state.totalPrice}
					purchasable={this.state.purchasable}
					purchasing={this.purchaseHandler}
				/>
			</Auxillary>
		);
	}
}

export default BurgerBuilder;
