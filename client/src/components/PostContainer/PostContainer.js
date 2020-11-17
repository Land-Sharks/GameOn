import React, { useState, useEffect } from "react";
import Post from "../Post/Post";

const PostContainer = (props) => {
	const [posts, setPosts] = useState([4, 2]);

	return (
		<div className="post-container">
			{posts.map((p) => {
				return <Post post={p} />;
			})}
		</div>
	);
};

export default PostContainer;
