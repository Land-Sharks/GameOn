import React, { useState, useEffect } from 'react';
import "./UserPage.css";
import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/Post/Post";
import Game from "../../components/Game/Game";
import auth from '../../services/auth';

const UserPage = (props) => {

    // Get users' posts setup
    const [ posts, setPosts ] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const response = await fetch('/users/username/posts');
        const data = await response.json();
        setPosts(data);
    }

    // Get users' followed games setup
        const [ games, setGamesFollowed ] = useState([]);
        useEffect(() => {
            getGamesFollowed();
        }, []);

        const getGamesFollowed = async () => {
            const response = await fetch(`/api/users/${auth.user.username}/games/`);
            const data = await response.json();
            console.log(data)
            setGamesFollowed(data);
        }

    return (
        <div>
            <NavBar />

            <h1>Displaying user page</h1>
            <p>Displaying games followed</p>
            {/* <div className="user-activity">
                {posts.map((p) => {
                    return <Post post={p} />;
                })}
            </div> */}

            <div className="user-games">
                {
                    games.map((e) => {
                        return  <h1>{e.name}</h1>                            
                    })
                }

            </div>
        </div>
    )

}

export default UserPage;