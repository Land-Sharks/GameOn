import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "../Form/Form";

import auth from "../../services/auth";
import "./LoginForm.css";

const LoginForm = (props) => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [loginError, setLoginError] = useState(false);

	const history = useHistory();

	const login = async () => {
		const res = await auth.authenticate(username, password);
		console.log(res);
		if (res === 'Login Unsuccessful') {
			setLoginError(true);
		} else {
			props.setAuthenticated(true);
		}
	}

	return (
		<Form
			formClass="login-form"
			title="Login"
			closeForm={props.closeForm}
			submitForm={login}
		>
			
			<input
				type="text"
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			{loginError ? (
				<p className="error-text">username / password is incorrect</p>
			) : (
				<div />
			)}
			<a className="forgot-link" href="forgot">
				Forgot username/password
			</a>
		</Form>
	);
};

export default LoginForm;
