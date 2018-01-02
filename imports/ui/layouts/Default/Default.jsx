import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Index from '../../pages/Index/Index';
import NotFound from '../../pages/NotFound/NotFound';

const Default = props => {
    return (
        <Router>
            <Route path="/" component={Index} {...props} />
        </Router>
    );
};

export default Default;