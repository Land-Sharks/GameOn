import React, { useState, useEffect } from "react";
import "./Game.css";

import auth from "../../services/auth";

const Game = (props) => {
	const [isFollowing, setIsFollowing] = useState(props.following);

	const [imageUrl, setImageUrl] = useState();

	const getImageUrl = () => {
		const baseUrl = "https://static-cdn.jtvnw.net/ttv-boxart/";
		const gameUrl = props.name.replace(" ", "%20");
		const dimenUrl = "-276x368.jpg";
		const url = baseUrl + gameUrl + dimenUrl;
		return url;
	};

	useEffect(() => {
		setImageUrl(getImageUrl());
	});

	const followGame = async () => {
		const response = await fetch("/api/games/follow", {
			method: "POST",
			body: JSON.stringify({
				gameId: props.gameId,
				username: auth.user.username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			console.log(await response.json());
		}

		setIsFollowing(!isFollowing);
	};

	return (
		<div className="game-card">
			{/* <h1>{props.name}</h1> */}
            {/* <div className="genre">
                {props.genres.map(g => (
                    <p>{g.name}</p>
                ))}
            </div> */}
			<img
				className={`game-image ${
					isFollowing ? "following" : "not-following"
                }`}
                onClick={followGame}
				src={imageUrl}
			/>
			{/* <input className={isFollowing ? 'red' : 'green'} type="button" onClick={followGame} value={isFollowing ? 'unfollow' : 'follow'}/> */}
		</div>
	);
};

export default Game;
