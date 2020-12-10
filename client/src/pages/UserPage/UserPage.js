import React, { useState, useEffect } from 'react';
import "./UserPage.css";
import NavBar from "../../components/NavBar/NavBar";
import Post from "../../components/Post/Post";
import Game from "../../components/Game/Game";
import auth from '../../services/auth';
import { use } from 'passport';

const UserPage = (props) => {

    // Get users following/followers
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    // Get users' posts setup
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts();
        getGamesFollowed();
        getUsersFollowing();
        getUsersFollowed();
    }, []);

    const getPosts = async () => {
        const response = await fetch('/api/users/username/posts');
        const data = await response.json();
        setPosts(data);
    }

    // Get users' followed games setup
    const [games, setGames] = useState([]);

    const getGamesFollowed = async () => {
        const endpoint = `/api/users/${auth.user.username}/games/`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data)
        setGames(data);
    }

    const getUsersFollowed = async () => {
        const endpoint = `api/users/${auth.user.username}/followers`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data)
        setFollowers(data);
    }
    const getUsersFollowing = async () => {
        const endpoint = `api/users/${auth.user.username}/following`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        setFollowings(data);
    }

    return (
        <div>
            <NavBar />
            <div className="user-page-container">

                <div className="user-info-container">

                    {/* User Followers */}
                    <div className="user-follows">
                        <h1>Followers</h1>
                        {
                            followers.map((e) => {
                                return <h2>{e.username}</h2>
                            })
                        }
                    </div>

                    {/* User Following */}
                    <div className="user-follows">
                        <h1>Following</h1>
                        {
                            followings.map((e) => {
                                return <h2>{e.username}</h2>
                            })
                        }
                    </div>


                </div>


                {/* User Games */}

                <div className="user-games">

                    {/* <h1 id="heading">Games You Follow</h1> */}
                    
                    {
                        games.map((e) => {
                            return <Game gameId={e.id}
                                name={e.name}
                                genres={e.genres}
                                following={true} />
                        })
                    }
                </div>
            </div>

        </div>

    )

}

export default UserPage;

// {/* User Posts */}
// <div className="user-activity">
//     {posts.map((p) => {
//         return <Post post={p} />;
//     })}
// </div>