/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AppContext from '../SharedComponents/06.Context/AppContext';
// import axios from 'axios';

interface Subscription {
  name: string;
  price: number; // May need to be a number?
  category: string;
  date: string;
}

function parseSubs(array: any): Subscription[] {
  const allSubscriptions: Subscription[] = [];
  const input = array;
  const companyNames: any = ['Netflix', 'Hulu', 'Uber', 'Starbucks', 'Amazon Prime', 'Gym', 'Xbox Live', 'Playstation PLus', 'YouTube TV', 'Spotify', 'Apple Music', 'Pandora', 'Crunchyroll', 'Google'];

  input.forEach((result: any) => {
    if (companyNames.includes(result.merchant_name)) {
      allSubscriptions.push({
        name: result.merchant_name,
        price: result.amount,
        category: result.category[0],
        date: result.date,
      });
    }
  });
  return allSubscriptions;
}

function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const { userObj } = useContext(AppContext);
  const { access_token } = userObj;


  useEffect(() => {
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

  return (
    <div className="subscriptions-outter-container">
      <div className="subscriptions-inner-container">
        <div className="subscriptions-list-container">
          <div className="list-header-container">
            <div className="your-subscriptions-title">Your Current Subscriptions</div>
            <AiOutlinePlusCircle className="circle-icon" />
          </div>
          <div className="subscriptions-list">
            {subs.map((singleSub) => (
              <div key={singleSub.date} className="sub-button-div">
                <button type="button" className="sub-button">
                  <div>{singleSub.name}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="subscriptions-graph-container">
          graph
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
