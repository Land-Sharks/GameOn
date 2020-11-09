import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.css';

import auth from '../../services/auth';

const NavBar = (props) => {

    const history = useHistory();

    const logout = async () => {
        const res = await auth.signout();
        history.go(0);
    }

    return <nav>
       <h1>GameOn</h1>
        {
            auth.isAuthenticated 
            ? <Fragment>
                    <input type="text" />
                    <input type="button" value="Profile" />
                    <input type="button" onClick={logout} value="Logout" />
                </Fragment>
                : <Fragment>
                    <input type="button" onClick={props.displayLoginForm} value="Login" />
                    <input type="button" onClick={props.displaySignUpForm} value="Sign Up" />
                </Fragment>
        }
    </nav>

}

export default NavBar;