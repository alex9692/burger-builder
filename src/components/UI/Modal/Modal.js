import React from "react";

import classes from "./Modal.css";
import Auxillary from "../.././../hoc/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
	const modalStatus = props.show ? classes.Show : classes.Hide;
	return (
		<Auxillary>
			<Backdrop show={props.show} closeBackdrop={props.close} />
			<div
				className={classes.Modal + " " + modalStatus}
				// style={{
				// 	transform: props.show ? "translateY(0)" : "translateY(-100vh)",
				// 	opacity: props.show ? "1" : "0"
				// }}
			>
				{props.children}
			</div>
		</Auxillary>
	);
};

export default modal;
