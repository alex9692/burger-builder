import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Register.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Register extends Component {
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
			},
			confirmPassword: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Confirm your password"
				},
				value: "",
				validation: {
					required: true,
					matchPassword: true
				},
				valid: false,
				touched: false
			}
		},
		disabled: true
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

		this.setState({ controls: updatedControls }, () => {
			if (
				this.state.controls.password.valid &&
				this.state.controls.confirmPassword.value ===
					this.state.controls.password.value
			) {
				this.setState({ disabled: false });
			} else {
				this.setState({ disabled: true });
			}
		});
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules && rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules && rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules && rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}
		if (rules && rules.matchPassword) {
			isValid = value === this.state.controls.password.value && isValid;
		}
		return isValid;
	};

	onSubmitHandler = event => {
		event.preventDefault();

		const formData = {};
		for (let key in this.state.controls) {
			if (key !== "confirmPassword")
				formData[key] = this.state.controls[key].value;
		}

		this.props.onSubmit(formData);
	};

	render() {
		let redirect = null;
		if (this.props.isRegistered) {
			this.props.onRegistrationFinished();
			redirect = <Redirect to="/auth" />;
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
				<Button btnType="Success" disabled={this.state.disabled}>
					SIGN UP
				</Button>
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
			<div className={classes.Register}>
				{redirect}
				{errorMessage}
				{formElement}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isRegistered: state.register.isRegistered,
		loading: state.register.loading,
		error: state.register.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: registerData => dispatch(actions.register(registerData)),
		onRegistrationFinished: () => dispatch(actions.registerFinish())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
