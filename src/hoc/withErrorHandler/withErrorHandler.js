import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxillary from "../Auxillary/Auxillary";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				error: null
			};
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				res => {
					return res;
				},
				error => {
					console.log(error);
					this.setState({ error: error });
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Auxillary>
					<Modal show={this.state.error} close={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxillary>
			);
		}
	};
};

export default withErrorHandler;
