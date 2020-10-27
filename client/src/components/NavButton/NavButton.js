import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = (props) => {

    return (
        <button>
            <Link to={props.route}>{props.content}</Link>
        </button>
    )

} 

export default NavButton;