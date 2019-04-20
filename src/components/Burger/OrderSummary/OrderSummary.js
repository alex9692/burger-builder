import React from "react";

import Auxillary from "../../../hoc/Auxillary";

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
			<p>Continue to checkout?</p>
		</Auxillary>
	);
};

export default orderSummary;
