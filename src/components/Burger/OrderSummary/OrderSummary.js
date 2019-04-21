import React from "react";

import Auxillary from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(
		(igKey, index) => {
			return (
				<li key={igKey + index}>
					<span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
					{props.ingredients[igKey]}
				</li>
			);
		}
	);
	return (
		<Auxillary>
			<h3>Your Orders:</h3>
			<p>A delicious burger with following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</Auxillary>
	);
};

export default orderSummary;
