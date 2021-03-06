import React, { useState, uesEffect } from "react";
import './Post.css';
import Comment from "../Comment/Comment";

// Displays:
// Posters' username
// List of comments
// Time of post
//
const Post = (props) => {
	const [comments, setComments] = useState([
		{
			name: "John Smith",
			body: "This is a comment about the random thing in question",
			time: "11-7-2020 2:59AM",
		},
	]);
	
	return (
		<div className="post">
			<h3 className="poster-name">{props.post.username}</h3>
			<p>{props.post.text}</p>
			<p>{props.post.updatedAt}</p>
			{/* <input type="text" placeholder="Comment" /> */}
			{/* <input type="button" value="Submit" /> */}
			{/* {comments.map((c) => {
				return <Comment name={c.name} body={c.body} time={c.time} />;
			})} */}
		</div>
	);
};

export default Post;
