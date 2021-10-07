import * as React from 'react';
import {
  useState,
  useEffect,
} from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';
import Overview from './05.Overview/Overview';
import Home from './01.Homepage/Home';
// import NotFound from './NotFound';
import Navbar from './SharedComponents/02.Navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Login from './03.Login/Login';
import Settings from './04.Settings/Settings';
// import Goals from './06.Goals/Goals';
// import BudgetBreakdown from './07.BudgetBreakdown/BudgetBreakdown';
// import Subscriptions from './08.Subscriptions/Subscriptions';
// import CreditPayments from './09.CreditPayments/CreditPayments';

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState({ state: ' ' });
  const [authenticated, setAuth] = useState<boolean>(false);

  const verifyAuth = () => {
    axios.get('http://localhost:4000/graphql?query={authenticated{id}}')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('verify auth response', response);
        setAuth(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <HashRouter>
      <div>
        <h1>Welcome to our Application!</h1>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/home/overview" component={Overview} authenticated={authenticated} />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/home/settings" component={Settings} authenticated={authenticated} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
