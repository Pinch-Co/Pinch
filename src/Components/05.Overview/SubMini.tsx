/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AppContext from '../SharedComponents/06.Context/AppContext';

interface Subscription {
  name: string;
  value: number;
  category: string;
  date: string;
}

function parseSubs(array: any): Subscription[] {
  const allSubscriptions: Subscription[] = [];
  const input = array;
  const companyNames: any = ['Netflix', 'Hulu', 'Uber', 'Starbucks', 'Amazon Prime', 'Gym', 'Xbox Live', 'Playstation PLus', 'YouTube TV', 'Spotify', 'Apple Music', 'Pandora', 'Crunchyroll', 'Google', 'United Airlines', 'McDonalds', 'KFC', 'Credit', 'ACH', 'phone', 'T-mobile', 'AT&T', 'Verizon', 'Comcast', 'Chase', 'Citizens', 'cable'];

  input.forEach((result: any) => {
    if (companyNames.includes(result.merchant_name)) {
      allSubscriptions.push({
        name: result.merchant_name,
        value: result.amount,
        category: result.category[0],
        date: result.date,
      });
    }
  });
  return allSubscriptions;
}

function uniqueList(array: any) {
  const uniqList: any = [];

  array.forEach((item: any) => {
    if (!uniqList.includes(item.name) && uniqList.length < 5) {
      uniqList.push(item.name);
    }
  });
  return uniqList;
}

function BudgetMini() {
  const [subs, setSubs] = React.useState<Subscription[]>([]);
  const [list, setList] = React.useState<any>([]);
  const { userObj } = React.useContext(AppContext);
  const { access_token } = userObj;
  const history = useHistory();

  React.useEffect(() => {
    // const headers = { 'Content-Type': 'application/json' };
    if (access_token) {
      const headers = { 'Content-Type': 'application/json' };
      axios.post('/graphql', JSON.stringify({
        query: `query {
          getTransactionRecent(accessToken: "${access_token}") {
            amount
            category
            date
            iso_currency_code
            name
            merchant_name
            transaction_type
          }
        }`,
      }), { headers })
        .then((result) => {
          const transacts = result.data.data.getTransactionRecent;
          setSubs(parseSubs(transacts));
        })
        .catch((error) => console.log(error));
    }
  }, [access_token]);

  React.useEffect(() => {
    setList(uniqueList(subs));
  }, [subs]);

  const handleClickSub = () => {
    history.push('/home/subscriptions');
  };

  return (
    <div className="goalchart-mini-container">
      <p
        role="button"
        onClick={() => handleClickSub()}
        onKeyPress={() => handleClickSub()}
        className="click-message"
      >
        Click to view more
      </p>
      <div className="inner-subs-container">
        <div className="overview-text-subs">
          <h5 className="subs-overall-title">Subscriptions</h5>
          <div className="snaps-sub">
            <p className="subs-text">Here is what we found that may be subscriptions or recurring costs</p>
          </div>
          <div className="snaps-sub">
            <p className="subs-text">last 30 days</p>
          </div>
        </div>
        <div className="sub-container-snapshot">
          {list.map((sub: any) => (
            <div className="sub-box" key={sub}>
              <img className="sub-logo" src={`https://logo.clearbit.com/${sub.toLowerCase().replace(' ', '')}.com`} alt="company logo" />
              <div className="sub-name">
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetMini;
