import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div id="not-found">
            <h1>Sorry, that page doesn't exist.</h1>
            <Link to="/" className="btn-go-to-home">Go to home</Link>
        </div>
    );
};

export default NotFound;