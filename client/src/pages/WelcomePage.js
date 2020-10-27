import React, { useState,  useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';

const WelcomePage = (props) => {

    const [ newUser, setNewUser ] = useState(true);

    const changeView = () => {
        setNewUser(!newUser);
    }

    return (
        <div>
            <h1>GameOn</h1>
            <h2>The New Way to Game</h2>

            {
                newUser ? <SignUpForm changeView={changeView}/> 
                    : <LoginForm changeView={changeView} setUser={props.setUser}/>
            }
        </div>
    );

}

export default WelcomePage;