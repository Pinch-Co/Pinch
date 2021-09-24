/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Overview from './Overview.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import Navbar from './Navbar.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState({ state: ' ' });

  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to our Application!</h1>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/home/overview" component={Overview} />
          <Route exact path="/home" component={Home} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
