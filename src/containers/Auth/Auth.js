import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Enter your Email"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Enter your password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}
	};

	changeHandler = (event, inputIdentifier) => {
		const updatedControls = {
			...this.state.controls,
			[inputIdentifier]: {
				...this.state.controls[inputIdentifier],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[inputIdentifier].validation
				),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules && rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules && rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules && rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		if (rules && rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	onSubmitHandler = event => {
		event.preventDefault();

		const formData = {};
		for (let key in this.state.controls) {
			formData[key] = this.state.controls[key].value;
		}

		this.props.onSubmit(formData);
	};

	render() {
		let redirect = null;
		if (this.props.signInOver) {
			this.props.onSignInOver();
			if (!this.props.building) {
				redirect = <Redirect to="/" />;
			} else {
				redirect = <Redirect to="/checkout" />;
			}
		}
		const formElementsArray = Object.keys(this.state.controls).map(key => {
			return {
				id: key,
				config: this.state.controls[key]
			};
		});

		const form = formElementsArray.map(formElement => {
			return (
				<Input
					key={formElement.id}
					elementtype={formElement.config.elementType}
					elementconfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					propType={formElement.id}
					changed={event => this.changeHandler(event, formElement.id)}
				/>
			);
		});

		let formElement = (
			<form onSubmit={this.onSubmitHandler}>
				{form}
				<Button btnType="Success">SIGN IN</Button>
			</form>
		);

		if (this.props.loading) {
			formElement = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error.error}</p>;
		}

		return (
			<div className={classes.Auth}>
				{redirect}
				{errorMessage}
				{formElement}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		signInOver: state.auth.signInOver,
		loading: state.auth.loading,
		error: state.auth.error,
		building: state.burger.building
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: authData => dispatch(actions.auth(authData)),
		onSignInOver: () => dispatch(actions.signInOver())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
