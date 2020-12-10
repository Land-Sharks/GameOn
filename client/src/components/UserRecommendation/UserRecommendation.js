import React, { useState } from 'react';
import auth from '../../services/auth';
import './UserRecommendation.css'

const UserRecommendation = (props) => {

    const [ users, setUsers ] = useState([]);

    const [isFollowing, setIsFollowing] = useState(props.following);

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
        
        if (!response.ok) {
			console.log(await response.json());
		}

		setIsFollowing(!isFollowing);
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
                        <input type="button" onClick={() => followUser(user.username)} value={`${isFollowing ? "Follow" : "Unfollow"}`}/>
                    </div>
                })
            }
        </div>
    )

}

export default UserRecommendation;
