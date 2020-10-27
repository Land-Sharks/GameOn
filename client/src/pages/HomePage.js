import React, { useState, useEffect } from 'react';

const HomePage = (props) => {

    console.log(props.user);

    return (
        <div>
            <h1>Welcome {props.user.username}</h1>
        </div>
    )

}

export default HomePage;