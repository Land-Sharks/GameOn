import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import "./SignUpForm.css";

const SignUpForm = (props) => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();


	return (
		<Form
			formClass="signup-form"
			title="Sign Up"
			closeForm={props.closeForm}
		>
            <div className="name-fields">
                <input
                    type="text"
                    onClick={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    onClick={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
            </div>
			<input
				type="text"
				onClick={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<input
				type="text"
				onClick={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<input
				type="password"
				onClick={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
		</Form>
	);
};

export default SignUpForm;
