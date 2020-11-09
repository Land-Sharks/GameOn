import React from 'react';

// Displays: 
// Commmenter's name
// Comment
// Time of comment
// Option to edit comment if the logged in user is the commenter
// Option to remove comment if the logged in user is the commenter or post owner 
const Comment = (props) => {

    return <div className="comment">
        <h3>{props.name}</h3>
        <p>{props.body}</p>
        <p>{props.time}</p>
        <a>Edit</a>
        <a>Delete</a>
    </div>

}

export default Comment;