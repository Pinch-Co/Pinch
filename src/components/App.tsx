/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Overview from './Overview';
import Home from './Home';
import NotFound from './NotFound';
import Navbar from './Navbar';
// import ProtectedRoute from './ProtectedRoute';

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState({ state: ' ' });

  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to our Application!</h1>
        <Navbar />
        <Switch>
          {/* <ProtectedRoute exact path="/home/overview" component={Overview} /> */}
          <Route exact path="/home" component={Home} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
