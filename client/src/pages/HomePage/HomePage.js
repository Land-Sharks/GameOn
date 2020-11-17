import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostContainer from "../../components/PostContainer/PostContainer";
import "./HomePage.css";

const HomePage = (props) => {

	return (
		<div className="home-page">
			<NavBar />
			<PostContainer />
		</div>
	);
};

export default HomePage;
