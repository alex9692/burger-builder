import React from "react";

import classes from "./Layout.css";
import Auxillary from "../../hoc/Auxillary";

const layout = props => (
	<Auxillary>
		<div>Toolbar, Sidedrawer, Backdrop</div>
		<main className={classes.Contents}>{props.children}</main>
	</Auxillary>
);

export default layout;
