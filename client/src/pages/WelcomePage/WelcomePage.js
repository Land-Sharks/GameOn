import React, { useState,  useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import NavBar from '../../components/NavBar/NavBar';
import "./WelcomePage.css";

const WelcomePage = (props) => {

    const [ login, setLogin ] = useState(false);
    const [ signUp, setSignUp ] = useState(false);

    const displayLoginForm = () => {
        setLogin(true);
        setSignUp(false);
    }

    const displaySignUpForm = () => {
        setLogin(false);
        setSignUp(true);
    }

    const closeForm = () => {
        setLogin(false);
        setSignUp(false);
    }

    return (
        <div className="welcome-page">
            <NavBar displayLoginForm={displayLoginForm} 
                displaySignUpForm={displaySignUpForm} />
            {
                login ? <LoginForm closeForm={closeForm} setAuthenticated={props.setAuthenticated}/>
                    : signUp ? <SignUpForm closeForm={closeForm} />
                    : <div class="welcome-text">
                        <h2>Where will GameOn take you?</h2>
                        <h3>Explore a gaming community like never before</h3>
                        <input type="button" onClick={displaySignUpForm} value= "Get Started"></input>
                    </div>
            }
        </div>
    );

}

export default WelcomePage;