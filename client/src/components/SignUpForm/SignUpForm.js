import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import Form from "../Form/Form";
import "./SignUpForm.css";

const SignUpForm = (props) => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [signupSuccessful, setSignUpSuccessful ] = useState();

	const history = useHistory();

	const signup = async () => {
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ firstName, lastName, email, username, password}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if(!response.ok) {
			setSignUpSuccessful(false);
		} else {
			setSignUpSuccessful(true);
		}
	}

	return (
		<Form
			formClass="signup-form"
			title="Sign Up"
			closeForm={props.closeForm}
			submitForm={signup}
			successful={signupSuccessful}
		>		
			<div className="name-fields">
				<input
					type="text"
					onChange={(e) => setFirstName(e.target.value)}
					placeholder="First Name"
				/>
				<input
					type="text"
					onChange={(e) => setLastName(e.target.value)}
					placeholder="Last Name"
				/>
			</div>
			<input
				type="text"
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
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
			
		</Form>
	);
};

export default SignUpForm;
