/* eslint-disable object-shorthand */
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
// import NotFound from './SharedComponents/NotFound/NotFound';
import Navbar from './SharedComponents/02.Navbar/Navbar';
import ProtectedRoute from './SharedComponents/04.ProtectedRoute/ProtectedRoute';
import Login from './03.Login/Login';
import SignUp from './02.Signup/Signup';
import Additionalinfo from './02.Signup/Additional-info';
import Settings from './04.Settings/Settings';
import Footer from './SharedComponents/03.Footer/Footer';
import Header from './SharedComponents/01.Header/Header';
import Goals from './06.Goals/Goals';
import BudgetBreakdown from './07.BudgetBreakdown/BudgetBreakdown';
import Subscriptions from './08.Subscriptions/Subscriptions';
import CreditPayments from './09.CreditPayments/CreditPayments';
import AppContext from './SharedComponents/06.Context/AppContext';

function App() {
  const [showNav, setNav] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<any>({
    id: '',
    email: '',
    access_token: '',
    item_id: '',
  });

  const switcher = showNav || sessionStorage.nav;

  useEffect(() => {
    const user = sessionStorage.getItem('id');
    if (user) {
      const headers = { 'Content-Type': 'application/json' };
      axios.post('/graphql', JSON.stringify({
        query: `query { getUserInfo(id: "${user}") {
        id
        email
        accessToken
        itemId
      }
    }`,
      }), { headers })
        .then((result) => {
          const {
            id, accessToken, email, itemId,
          } = result.data.data.getUserInfo;
          setUserObj({
            id: id,
            email: email,
            access_token: accessToken,
            item_id: itemId,
          });
        })
        .catch((error) => { throw (error); });
    }
  }, []);

  return (
    <AppContext.Provider value={{
      userObj, setUserObj, setNav, showNav,
    }}
    >
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/additional-info" component={Additionalinfo} />
            <div className="app-page-container">
              <div>
                <Header />
                {switcher
                  ? <Navbar />
                  : null}
                <ProtectedRoute path="/home/overview" component={Overview} />
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <ProtectedRoute path="/home/settings" component={Settings} />
                <ProtectedRoute path="/home/goals" component={Goals} />
                <ProtectedRoute path="/home/budget" component={BudgetBreakdown} />
                <ProtectedRoute path="/home/subscriptions" component={Subscriptions} />
                <ProtectedRoute path="/home/credit" component={CreditPayments} />
                {/* <Route exact path="*" component={NotFound} /> */}
              </div>
              <Footer />
            </div>
          </Switch>
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}

export default App;
