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
import NotFound from './SharedComponents/NotFound/NotFound';
import Navbar from './SharedComponents/02.Navbar/Navbar';
import ProtectedRoute from './SharedComponents/04.ProtectedRoute/ProtectedRoute';
import Login from './03.Login/Login';
import SignUp from './02.Signup/Signup';
import Settings from './04.Settings/Settings';
import Footer from './SharedComponents/03.Footer/Footer';
import Header from './SharedComponents/01.Header/Header';
import Goals from './06.Goals/Goals';
import BudgetBreakdown from './07.BudgetBreakdown/BudgetBreakdown';
import Subscriptions from './08.Subscriptions/Subscriptions';
import CreditPayments from './09.CreditPayments/CreditPayments';

function App() {
  // eslint-disable-next-line
  const [state, setState] = useState({ state: ' ' });
  const [authenticated, setAuth] = useState<boolean>(false);
  const [showNav, setNav] = useState<boolean>(false);

  const verifyAuth = () => {
    axios.get('http://localhost:4000/graphql?query={authenticated{id}}')
      .then((response) => {
        if (response.data.data.authenticated) {
          setAuth(true);
          setNav(true);
        }
      })
      .catch(() => {
        setAuth(false);
      });
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <div>
            <Header />
            <Navbar />
            {showNav
              ? <Navbar />
              : null}
            <ProtectedRoute path="/home/overview" component={Overview} authenticated={authenticated} />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <ProtectedRoute path="/home/settings" component={Settings} authenticated={authenticated} />
            <ProtectedRoute path="/home/goals" component={Goals} authenticated={authenticated} />
            <ProtectedRoute path="/home/budget" component={BudgetBreakdown} authenticated={authenticated} />
            <ProtectedRoute path="/home/subscriptions" component={Subscriptions} authenticated={authenticated} />
            <ProtectedRoute path="/home/credit" component={CreditPayments} authenticated={authenticated} />
            <Route exact path="*" component={NotFound} />
          </div>
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
