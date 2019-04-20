import React from "react";

import classes from "./Modal.css";

const modal = props => {
	const modalStatus = props.show ? classes.Show : classes.Hide;
	return (
		<div
			className={classes.Modal + " " + modalStatus}
			// style={{
			// 	transform: props.show ? "translateY(0)" : "translateY(-100vh)",
			// 	opacity: props.show ? "1" : "0"
			// }}
		>
			{props.children}
		</div>
	);
};

export default modal;
