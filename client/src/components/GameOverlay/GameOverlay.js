import React from 'react';
import './GameOverlay.css'

const GameOverlay = (props) => {

    return <div className="game-overlay">
        <h1>{props.name}</h1>
        <hr></hr>
        <h3>Genre</h3>
        <div className="genre">
            {props.genres.map(g => (
                <p>{g.name}</p>
            ))}
        </div>

    </div>

}

export default GameOverlay