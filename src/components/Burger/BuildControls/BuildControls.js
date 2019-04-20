import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Meat", type: "meat" },
	{ label: "Salad", type: "salad" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Bacon", type: "bacon" }
];

const buildControls = props => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
		</p>
		{controls.map(el => {
			return (
				<BuildControl
					key={el.label}
					label={el.label}
					added={() => props.ingredientAdded(el.type)}
					removed={() => props.ingredientRemoved(el.type)}
					disable={props.disabled[el.type]}
				/>
			);
		})}
		<button
			disabled={!props.purchasable}
			onClick={props.purchasing}
			className={classes.OrderButton}
		>
			ORDER NOW
		</button>
	</div>
);

export default buildControls;
