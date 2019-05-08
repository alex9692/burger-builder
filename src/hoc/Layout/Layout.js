import React, { Component } from "react";
import { connect } from "react-redux";

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
			return {
				showSideDrawer: !prevState.showSideDrawer
			};
		});
	};

	render() {
		return (
			<Auxillary>
				<Toolbar
					isAuth={this.props.isAuth}
					toggleSideDrawerFromMenu={this.toggleSideDrawerFromMenuHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
					showSideDrawer={this.state.showSideDrawer}
					closeSideDrawer={this.sideDrawerCloseHandler}
				/>
				<main className={classes.Contents}>{this.props.children}</main>
			</Auxillary>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth
	};
};

export default connect(mapStateToProps)(Layout);
