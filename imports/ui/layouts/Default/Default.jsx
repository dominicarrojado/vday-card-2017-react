import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from '../../pages/Index/Index';

const Default = props => {
  return (
    <Router>
      <Route path="/" component={Index} {...props} />
    </Router>
  );
};

export default Default;
