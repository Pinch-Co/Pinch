import React from 'react';
import { Route } from 'react-router-dom';

const DummyLoggedIn = function() {
  return (
    <div>
      <h1>Welcome to our Application!</h1>
      <Route exact path="/DummyLoggedIn" component={DummyLoggedIn} />
    </div>
  );
};

export default DummyLoggedIn;
