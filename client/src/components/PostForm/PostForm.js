import React, { useState } from 'react';
import Form from '../Form/Form';
import auth from '../../services/auth';

const PostForm = (props) => {

    const [text, setText] = useState();

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

        const data = await response.json();

        console.log(data);

    }

    return (
        <Form
            formClass="post-form"
            title="Posting"
            submitForm={createPost}
            closeForm={props.toggleForm}
            >
            <textarea onChange={(e) => setText(e.target.value)}/>
        </Form>
    );

}

export default PostForm;