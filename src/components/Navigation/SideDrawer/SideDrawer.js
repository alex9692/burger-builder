import React from "react";

import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxillary from "../../../hoc/Auxillary/Auxillary";

const sideDrawer = props => {
	let attachedClass = [classes.SideDrawer, classes.Close];
	if (props.showSideDrawer) {
		attachedClass = [classes.SideDrawer, classes.Open];
	}
	return (
		<Auxillary>
			<Backdrop
				show={props.showSideDrawer}
				closeBackdrop={props.closeSideDrawer}
			/>
			<div className={attachedClass.join(" ")}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Auxillary>
	);
};

export default sideDrawer;
