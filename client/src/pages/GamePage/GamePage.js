import React, { useState, useEffect } from "react";
import Game from "../../components/Game/Game";
import NavBar from "../../components/NavBar/NavBar";
import "./GamePage.css";

import auth from '../../services/auth';

const GamePage = (props) => {

    const [ games, setGames ] = useState([]);

    useEffect(() => {

        getGames();

    }, []);

    const getGames = async () => {

        const endpoint = auth.user ? `/api/games/${auth.user.username}` : `/api/games`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setGames(data);

    }

    return (
        <div>
            <NavBar />
            {/* <h1>GamePage</h1> */}
            <div className="games-container">
                {
                    games.map((e) => {
                        return <Game gameId={e.id} 
                            name={e.name} 
                            genres={e.genres} 
                            following={e.users.length > 0}/>
                    })
                }
            </div>
        </div>
    )

}

export default GamePage;