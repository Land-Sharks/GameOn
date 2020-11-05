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

const App = () => {

    const [ user, setUser ] = useState();

    return (
        <Router>
            <div>
                <Switch>
                    {
                        user ? <Route exact path="/" component={() => <HomePage user={user}/>} />
                        : <Route exact path="/" component={() => <WelcomePage setUser={setUser}/>} />
                    }
                </Switch>
            </div>
        </Router>
    );
}

export default App;
