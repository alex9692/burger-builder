import React from "react";

import classes from "./Backdrop.css";

const backdrop = props => {
	// if (props.show) {
	// 	return <div className={classes.Backdrop} />;
	// }
	// return null;
	return props.show ? <div className={classes.Backdrop} onClick={props.closeBackdrop} /> : null;
};

export default backdrop;
