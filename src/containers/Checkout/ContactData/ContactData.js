import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-service";
import { read_cookie } from "sfcookies";
import jwt from "jsonwebtoken";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import { COOKIE_KEY } from "../../../store/actions/actionTypes";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipcode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code"
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
					isNumeric: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				},
				value: "fastest",
				valid: true
			}
		},
		formIsValid: false
	};

	changeHandler = (event, inputIdentifier) => {
		const updatedForm = {
			...this.state.orderForm
		};

		const updatedFormElement = {
			...updatedForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedForm, formIsValid });
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
		if (rules && rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	orderHandler = event => {
		event.preventDefault();

		const formData = {};
		for (let formDataIdentifier in this.state.orderForm) {
			formData[formDataIdentifier] = this.state.orderForm[
				formDataIdentifier
			].value;
		}

		const token = read_cookie(COOKIE_KEY);
		const userId = jwt.decode(token).userId;

		const order = {
			userId,
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		};
		this.props.orderStart(order, this.props.history);
	};

	componentDidMount() {
		const token = read_cookie(COOKIE_KEY);
		const userId = jwt.decode(token).userId;
	}

	render() {
		const formElements = Object.keys(this.state.orderForm).map(key => {
			return {
				id: key,
				config: this.state.orderForm[key]
			};
		});
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements.map(formElement => {
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
				})}
				<Button disabled={!this.state.formIsValid} btnType="Success">
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice,
		loading: state.order.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		orderStart: (orderData, history) =>
			dispatch(actions.burgerOrderStart(orderData, history))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
