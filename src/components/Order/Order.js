import React from "react";

import classes from "./Order.css";

const order = props => {
	const ingredients = Object.keys(props.ingredients).map(igKey => {
		return {
			name: [igKey],
			amount: props.ingredients[igKey]
		};
	});
	return (
		<div className={classes.Order}>
			<p>
				Ingredients:{" "}
				{ingredients.map(ingredient => {
					return (
						<span
							key={ingredient.name}
							style={{
								textTransform: "capitalize",
								margin: "0 8px",
								padding: "5px",
								border: "1px solid #ccc",
								display: "inline-block"
							}}
						>
							{ingredient.name}({ingredient.amount}){" "}
						</span>
					);
				})}
			</p>
			<p>
				Price:<strong>USD {props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
