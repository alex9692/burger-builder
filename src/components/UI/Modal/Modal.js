import React, { Component } from "react";

import classes from "./Modal.css";
import Auxillary from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.show !== nextProps.show;
	}

	componentWillUpdate() {
		console.log("[Modal] WillUpdate");
	}

	render() {
		const modalStatus = this.props.show ? classes.Show : classes.Hide;
		return (
			<Auxillary>
				<Backdrop show={this.props.show} closeBackdrop={this.props.close} />
				<div
					className={classes.Modal + " " + modalStatus}
					// style={{
					// 	transform: props.show ? "translateY(0)" : "translateY(-100vh)",
					// 	opacity: props.show ? "1" : "0"
					// }}
				>
					{this.props.children}
				</div>
			</Auxillary>
		);
	}
}

export default Modal;
