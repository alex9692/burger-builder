import React, { Component } from "react";
import axios from "../../../axios-service";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
					maxLength: 5
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
					required: true
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
		formIsValid: false,
		loading: false
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

		return isValid;
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formDataIdentifier in this.state.orderForm) {
			formData[formDataIdentifier] = this.state.orderForm[
				formDataIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		};
		console.log(order);
		axios
			.post("/orders", order)
			.then(response => {
				console.log(response);
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
				this.props.history.push("/");
			});
	};

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
		if (this.state.loading) {
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

export default ContactData;
