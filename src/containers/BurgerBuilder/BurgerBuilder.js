import React, { Component } from "react";
import axios from "../../axios-service";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
		ingredientId: ""
	};

	componentDidMount() {
		axios
			.get("/ingredientList")
			.then(response => {
				const id = response.data[0]._id;
				delete response.data[0]._id;
				const ingredients = response.data[0];
				const totalPrice = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey];
					})
					.reduce((acc, cur, index) => {
						return acc + Object.values(INGREDIENT_PRICES)[index] * cur;
					}, this.state.totalPrice);
				this.setState({ ingredients, ingredientId: id, totalPrice });
				this.updatePurchaseState(ingredients);
			})
			.catch(err => {
				console.log(err);
				this.setState({ error: true });
			});
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
		const queryParams = [];

		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}

		queryParams.push("price=" + this.state.totalPrice);

		const queryString = queryParams.join("&");
		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryString
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = !(disabledInfo[key] > 0);
		}

		let orderSummary = null;

		let burger = this.state.error ? (
			<h3 style={{ textAlign: "center" }}>Ingredient's can't be loaded</h3>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<Auxillary>
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
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					totalPrice={this.state.totalPrice}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
