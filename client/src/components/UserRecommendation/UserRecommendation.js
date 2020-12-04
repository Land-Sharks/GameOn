import React, { useState } from 'react';
import auth from '../../services/auth';
import './UserRecommendation.css'

const UserRecommendation = () => {

    const [ users, setUsers ] = useState([]);

    const getRecommendations = async () => {
        const response = await fetch('/api/users/recommendUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: auth.user.username,
            })
        });

        const data = await response.json();

        setUsers(data);
    }

    const followUser = async (follow) => {
        const response = await fetch('/api/users/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                follower: follow,
                user: auth.user.username
            })
        });
    }

    useState( () => {
        getRecommendations();
    }, [])

    return (
        <div className="user-recommendations">
            <h1>Recommended Users</h1>
            {
                users.map(user => {
                    return <div>
                        <h3>{user.username}</h3>
                        <p>Games in common: {user.common}</p>
                        <input type="button" onClick={(val) => followUser(user.username)} value="follow"/>
                    </div>
                })
            }
        </div>
    )

}

export default UserRecommendation;