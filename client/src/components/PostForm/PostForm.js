import React, { useState } from 'react';
import Form from '../Form/Form';
import auth from '../../services/auth';

import './PostForm.css';

const PostForm = (props) => {

    const [text, setText] = useState();
    const [postSuccessful, setPostSuccessful] = useState(); 

    const createPost = async () => {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: auth.user.username,
                text: text
            })
        });

        if(!response.ok) {
            setPostSuccessful(false);
        } else {
            setPostSuccessful(true);
        }
    }

    return (
        <Form
            formClass="post-form"
            title="Posting"
            submitForm={createPost}
            closeForm={props.toggleForm}
            successful={postSuccessful}
            >
            <textarea onChange={(e) => setText(e.target.value)}/>
        </Form>
    );

}

export default PostForm;