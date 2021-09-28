import * as React from 'react';
import { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Overview from './05.Overview/Overview';
import Home from './01.Homepage/Home';
import NotFound from './SharedComponents/NotFound/NotFound';
import Navbar from './SharedComponents/02.Navbar/Navbar';
import ProtectedRoute from './SharedComponents/04.ProtectedRoute/ProtectedRoute';
import Login from './03.Login/Login';
import Settings from './04.Settings/Settings';
import Goals from './06.Goals/Goals';
import BudgetBreakdown from './07.BudgetBreakdown/BudgetBreakdown';
import Subscriptions from './08.Subscriptions/Subscriptions';
import CreditPayments from './09.CreditPayments/CreditPayments';

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
          <ProtectedRoute path="/home/goals" component={Goals} />
          <ProtectedRoute path="/home/budget" component={BudgetBreakdown} />
          <ProtectedRoute path="/home/subscriptions" component={Subscriptions} />
          <ProtectedRoute path="/home/credit" component={CreditPayments} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
