import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import "./NavBar.css";

import auth from "../../services/auth";

const NavBar = (props) => {
	const history = useHistory();

	const logout = async () => {
		const res = await auth.signout();
		history.go(0);
	};

	const goToGames = () => {
		history.push("games");
	};

	const goToProfile = () => {
		history.push("profile");
	};

	return (
		<nav>
			<div class="head">
				<img className="logo" src="/assets/images/logo.svg" alt="" />
				<a href="/">GameOn</a>
			</div>
			{auth.isAuthenticated ? (
				<Fragment>
					<input type="button" onClick={props.toggleForm} value="+"/>
					<input
						type="button"
						onClick={goToProfile}
						value="Profile"
					/>
					<input type="button" onClick={goToGames} value="Games" />

					<input type="button" onClick={logout} value="Logout" />
				</Fragment>
			) : (
				<Fragment>
					<input
						type="button"
						onClick={props.displayLoginForm}
						value="Login"
					/>
				</Fragment>
			)}
		</nav>
	);
};

export default NavBar;
