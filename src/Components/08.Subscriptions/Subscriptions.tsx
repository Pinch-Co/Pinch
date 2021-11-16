/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillArrowDownLeftCircleFill } from 'react-icons/bs';
import AppContext from '../SharedComponents/06.Context/AppContext';
import SubGraph from './SubGraph';
// import axios from 'axios';

interface Subscription {
  name: string;
  value: number; // May need to be a number?
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
    if (!uniqList.includes(item.name)) {
      uniqList.push(item.name);
    }
  });
  return uniqList;
}

function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [list, setList] = useState<any>([]);
  const [picked, setPick] = useState<any>([]);
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

  useEffect(() => {
    setList(uniqueList(subs));
  }, [subs]);

  const handleClick = (name: any) => {
    const specificSub: any = [];
    subs.forEach((item) => {
      if (item.name === name) {
        specificSub.push(item);
      }
    });
    setPick(specificSub);
  };

  // console.log('list', list);

  return (
    <div className="subscriptions-outter-container">
      <div className="subscriptions-inner-container">
        <div className="subscriptions-list-container">
          <div className="list-header-container">
            <div className="your-subscriptions-title">Your Current Subscriptions</div>
            <AiOutlinePlusCircle className="circle-icon" />
          </div>
          <div className="subscriptions-list">
            {list.map((singleSub: any) => (
              <div key={singleSub} className="sub-button-div">
                <button
                  type="button"
                  className="sub-button"
                  onClick={() => handleClick(singleSub)}
                  onKeyPress={() => handleClick(singleSub)}
                >
                  <div className="sub-organizer">
                    <div className="logo-container">
                      <img className="logo" src={`https://logo.clearbit.com/${singleSub.toLowerCase().replace(' ', '')}.com`} alt="company logo" />
                    </div>
                    <div className="sub-title">
                      {singleSub}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="subscriptions-graph-container">
          <div className="current-sub-box">
            {picked.length ? (
              <div className="current-sub-section">
                <div className="bigger-logo-container">
                  <img className="bigger-logo" src={`https://logo.clearbit.com/${picked[0].name.toLowerCase().replace(' ', '')}.com`} alt="company logo" />
                </div>
                <div className="current-sub-title">
                  {picked[0].name}
                  <p className="mini-title">{picked[0].category}</p>
                </div>
              </div>
            ) : (
              <div className="current-sub-title-choose">
                <BsFillArrowDownLeftCircleFill className="current-sub-title-choose-icon" />
                Choose a subscription
              </div>
            )}
          </div>
          {picked.length ? <SubGraph charData={picked} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;

/* <div className="graph-container">
{picked.length ? <SubGraph charData={picked} /> : null}
</div> */
