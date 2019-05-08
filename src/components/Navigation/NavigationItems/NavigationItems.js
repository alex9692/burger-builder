import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { read_cookie } from "sfcookies";
import jwt from "jsonwebtoken";
import { COOKIE_KEY } from "../../../store/actions/actionTypes";

const navigationItems = props => {
	const token = read_cookie(COOKIE_KEY);
	let userId;
	if (token.length) {
		userId = jwt.decode(token).userId;
	}
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				Burger Builder
			</NavigationItem>

			{!props.isAuth ? (
				<React.Fragment>
					<NavigationItem link="/auth">Sign In</NavigationItem>
					<NavigationItem link="/register">Sign Up</NavigationItem>
				</React.Fragment>
			) : (
				<React.Fragment>
					<NavigationItem link={"/orders/" + userId}>Orders</NavigationItem>
					<NavigationItem link="/logout">Sign Out</NavigationItem>
				</React.Fragment>
			)}
		</ul>
	);
};

export default navigationItems;
