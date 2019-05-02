import React from "react";

import classes from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = props => (
	<div className={classes.CheckoutSummary}>
		<h3>Hope it tastes well</h3>
		<div style={{ width: "100%", margin: "auto" }}>
			<Burger ingredients={props.ingredients} />
		</div>
		<Button clicked={props.checkoutCancelled} btnType="Danger">
			CANCEL
		</Button>
		<Button clicked={props.checkoutContinued} btnType="Success">
			CONTINUE
		</Button>
	</div>
);

export default checkoutSummary;
