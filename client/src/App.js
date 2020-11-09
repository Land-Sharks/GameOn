import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} from "react-router-dom";

import "./App.css";
import UserPage from "./pages/UserPage/UserPage";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import GamePage from "./pages/GamePage/GamePage";

import auth from './services/auth';

const App = () => {

    const [ authenticated, setAuthenticated ] = useState(auth.isAuthenticated);

    return (
        <Router>
            <div>
                <Switch>
                    {
                        auth.isAuthenticated ? <Route exact path="/" component={() => <HomePage />} />
                        : <Route exact path="/" component={() => <WelcomePage setAuthenticated={setAuthenticated}/>} />
                    }
                    <Route exact path="/games" component={() => <GamePage />}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
