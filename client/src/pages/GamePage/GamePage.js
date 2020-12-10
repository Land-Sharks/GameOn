import React, { useState, useEffect } from "react";
import Game from "../../components/Game/Game";
import NavBar from "../../components/NavBar/NavBar";
import FilterTool from "../../components/FilterTool/FilterTool";
import "./GamePage.css";

import auth from '../../services/auth';

const GamePage = (props) => {

    const [ games, setGames ] = useState([]);
    const [ baseUrl, setBaseUrl ] = useState(auth.user ? `/api/games/${auth.user.username}` : `/api/games/`)

    useEffect(() => {
        (async () => {
            await getGames(baseUrl);
        })();

    }, [baseUrl]);

    const addQuery = (u) => {
        // getGames(baseUrl + u)
        setBaseUrl(baseUrl + u)
    }

    const getGames = async (url) => {

        const endpoint = url;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        setGames(data);

    }

    return (
        <div>
            <NavBar />
            <h1 id="tagline">Find and follow your favorite games </h1>
            <FilterTool addQuery={addQuery}/>
            
            <div className="games-container">
                {
                    games.map((e) => {
                        // console.log(e.name + e.users);
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