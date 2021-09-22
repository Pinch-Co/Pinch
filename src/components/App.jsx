import React, { useState } from 'react';
import { Route, ProtectedRoute } from 'react-router-dom';
import DummyLoggedIn from './DummyLoggedIn.js';

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState({ state: ' ' });

  return (
    <div>
      <h1>Welcome to our Application!</h1>
      <ProtectedRoute exact path="/dummyloggedin" component={DummyLoggedIn} />
    </div>
  );
};

export default App;
