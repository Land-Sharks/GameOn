import React, { useState, useEffect } from 'react';
import './SignUpForm.css';

const SignUpForm = (props) => {

    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ email, setEmail ] = useState();
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();

    const signup = async () => {
        const data = { firstName, lastName, email, username, password };
        const req = await fetch("/api/users", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (req.status == 201) {
            console.log("Sign Up successful");
        } else {
            console.log("Failed to sign up");

        }
    }

    return (
        <div className="signup-form">
            <h1>Sign Up</h1>
            <label>First Name: </label>
            <input type="text" 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="first name"/>
            <label>Last Name: </label>
            <input type="text" 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="last name"/>
            <label>Email: </label>
            <input type="text" 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="email"/>
            <label>Username: </label>
            <input type="text" 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="username"/>
            <label>Password: </label>
            <input type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="password"/>
            <input type="button"
                onClick={props.changeView} 
                value="Login"/>
            <input type="button" 
                onClick={signup} 
                value="Sign Up"/> 
        </div>
    )

}

export default SignUpForm;