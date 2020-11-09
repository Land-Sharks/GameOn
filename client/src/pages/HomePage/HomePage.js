import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Post from '../../components/Post/Post';
import "./HomePage.css";

const HomePage = (props) => {

    console.log(props.user);

    return (
        <div className="home-page">
            <NavBar />
            <Post />
        </div>
    )

}

export default HomePage;