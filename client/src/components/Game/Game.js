import React, { useState, useEffect } from "react";
import "./Game.css";
import fetch from 'node-fetch';

import auth from "../../services/auth";
import GameOverlay from "../GameOverlay/GameOverlay";

const Game = (props) => {
	const [isFollowing, setIsFollowing] = useState(props.following);

    const [imageUrl, setImageUrl] = useState();
    
    const [displayOverlay, setDisplayOverlay] = useState(false)

	const getImageUrl = () => {
		const baseUrl = "https://static-cdn.jtvnw.net/ttv-boxart/";
        const gameUrl = props.name.replace(/\s/gm, "%20").replace(/’/gm, "%27");
		const dimenUrl = "-276x276.jpg";
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
        <div className="game-card" 
            >
			<img
				className={`game-image ${
                    isFollowing ? "following" : "not-following"
                }`}
                onClick={followGame}
				src={imageUrl}
			/>
            <GameOverlay name={props.name} genres={props.genres}/>
		</div>
	);
};

export default Game;
