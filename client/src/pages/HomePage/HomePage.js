import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PostContainer from "../../components/PostContainer/PostContainer";
import PostForm from "../../components/PostForm/PostForm";
import UserRecommendation from "../../components/UserRecommendation/UserRecommendation";
import "./HomePage.css";

const HomePage = (props) => {

	const [ posting, setPosting ] = useState(false);

	const toggleForm = () => {
		setPosting(!posting);
	}

	return (
		<div className="home-page">
			<NavBar toggleForm={toggleForm} />
			{
				posting ? <PostForm toggleForm={toggleForm}/> : <div />
			}
			<PostContainer />
			<UserRecommendation />
		</div>
	);
};

export default HomePage;
