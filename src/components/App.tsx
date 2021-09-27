import * as React from 'react';
import { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Overview from './05.Overview/Overview';
import Home from './01.Homepage/Home';
import NotFound from './NotFound';
import Navbar from './SharedComponents/02.Navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Login from './03.Login/Login';
import Settings from './04.Settings/Settings';

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState({ state: ' ' });

  return (
    <BrowserRouter>
      <div>
        <h1>Welcome to our Application!</h1>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/home/overview" component={Overview} />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/home/settings" component={Settings} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
