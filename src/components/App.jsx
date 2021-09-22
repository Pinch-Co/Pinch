import React from 'react';
import { Route } from 'react-router-dom';
import DummyLoggedIn from './DummyLoggedIn.js';

const App = function() {
  return (
    <div>
      <h1>Welcome to our Application!</h1>
      <Route exact path="/dummyloggedin" component={DummyLoggedIn} />
    </div>
  );
};

export default App;
