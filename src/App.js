import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import loadable from 'loadable-components';

// styles
import './css/normalize.css';
import './css/app.css';

// components
const Landing = loadable(() => import('./layouts/landingPage'));
const Standard = loadable(() => import('./layouts/standardPage'));

export default () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/' component={Standard} />
    </Switch>
  </Router>
);
