import React, { Component } from "react";

import classes from "./Layout.css";
import Auxillary from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerCloseHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	toggleSideDrawerFromMenuHandler = () => {
		this.setState(prevState => {
			console.log(prevState);
			return {
				showSideDrawer: !prevState.showSideDrawer
			};
		});
	};

	render() {
		return (
			<Auxillary>
				<Toolbar
					toggleSideDrawerFromMenu={this.toggleSideDrawerFromMenuHandler}
				/>
				<SideDrawer
					showSideDrawer={this.state.showSideDrawer}
					closeSideDrawer={this.sideDrawerCloseHandler}
				/>
				<main className={classes.Contents}>{this.props.children}</main>
			</Auxillary>
		);
	}
}

export default Layout;
