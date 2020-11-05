import React, { useState, useEffect } from 'react';
import "./HomePage.css";

const HomePage = (props) => {

    console.log(props.user);

    return (
        <div>
            <h1>Welcome {props.user.username}</h1>
        </div>
    )

}

export default HomePage;