import React, { useState, useEffect } from "react";

import "./LoginForm.css";

const LoginForm = (props) => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const login = async () => {
		const data = { username, password };
		const req = await fetch("/api/users/login", {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (req.status == 200) {
			console.log("User logged in");
		} else {
			console.log("Failed to log in");
		}
		props.setUser(await req.json());
    };

	return (
		<div className="login-form">
			<h1>Login</h1>
			<label>Username: </label>
			<input
				type="text"
				onChange={(e) => setUsername(e.target.value)}
				placeholder="username"
			/>
			<label>Password: </label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				placeholder="password"
			/>
			<input type="button" onClick={login} value="Login" />
			<input type="button" onClick={props.changeView} value="Sign Up" />
		</div>
	);
};

export default LoginForm;
