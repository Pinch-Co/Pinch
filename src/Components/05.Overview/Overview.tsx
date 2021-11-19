/* eslint-disable no-console */
/* eslint-disable camelcase */
import * as React from 'react';
import axios from 'axios';
import { RiBankLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import AppContext from '../SharedComponents/06.Context/AppContext';
import GoalMini from './GoalMini';
import BudgetMini from './BudgetMini';
import SubMini from './SubMini';

function parseBalance(array: any) {
  const allAccounts: any = {
    depository: [],
    credit: [],
    loans: [],
    investments: [],
  };

  array.forEach((account: any) => {
    if (account.type === 'depository') {
      allAccounts.depository.push(account);
    } else if (account.type === 'credit') {
      allAccounts.credit.push(account);
    } else if (account.type === 'investment') {
      allAccounts.investments.push(account);
    } else if (account.type === 'loan') {
      allAccounts.loans.push(account);
    }
  });
  return allAccounts;
}

function Overview() {
  const [accounts, setAccount] = React.useState<any>({
    depository: [],
    credit: [],
    loans: [],
    investments: [],
  });
  const { userObj } = React.useContext(AppContext);
  const { access_token } = userObj;
  React.useEffect(() => {
    if (access_token) {
      const headers = { 'Content-Type': 'application/json' };
      axios.post('/graphql',
        JSON.stringify({
          query: `query {
            getBalance(accessToken: "${access_token}") {
              account_id
              balances {
                available
                current
              }
              name
              official_name
              type
            }
        }`,
        }), { headers })
        .then((result) => {
          const data = result.data.data.getBalance;
          setAccount(parseBalance(data));
        })
        .catch((error) => console.log('error getting accounts', error));
    }
  }, [access_token]);

  return (
    <div className="overview-outter-container">
      <div className="overview-column-container">
        <div className="overview-side-panel">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 5 }}
            className="overview-welcome-bubble"
          >
            Welcome back! Here is a snapshot of your finances today
          </motion.div>
          <div className="overview-accounts-container">
            <div className="accounts-title-section">
              <div className="overview-accounts-title">
                Accounts
              </div>
              <div className="overview-accounts-icon">
                <RiBankLine className="bank-icon" />
              </div>
            </div>
            <hr className="account-line-break" />
            <div className="account-mini-container">
              <div className="account-type-title">
                Banking
              </div>
              <div className="account-container">
                {accounts.depository.map((singleAccount: any) => (
                  <div className="account-div" key={singleAccount.account_id}>
                    <p className="account-text">{singleAccount.name}</p>
                    <p className="account-text">
                      $
                      {singleAccount.balances.available}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="account-mini-container">
              <div className="account-type-title">
                Credit
              </div>
              <div className="account-container">
                {accounts.credit.map((singleAccount: any) => (
                  <div className="account-div" key={singleAccount.account_id}>
                    <p className="account-text">{singleAccount.name}</p>
                    <p className="account-text">
                      $
                      {singleAccount.balances.current}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="account-mini-container">
              <div className="account-type-title">
                Investments
              </div>
              <div className="account-container">
                {accounts.investments.map((singleAccount: any) => (
                  <div className="account-div" key={singleAccount.account_id}>
                    <p className="account-text">{singleAccount.name}</p>
                    <p className="account-text">
                      $
                      {singleAccount.balances.current}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="account-mini-container">
              <div className="account-type-title">
                Loans
              </div>
              <div className="account-container">
                {accounts.loans.map((singleAccount: any) => (
                  <div className="account-div" key={singleAccount.account_id}>
                    <p className="account-text">{singleAccount.name}</p>
                    <p className="account-text">
                      $
                      {singleAccount.balances.current}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="overview-snapshot-container">
          <div
            className="overview-snapshots"
          >
            <GoalMini />
          </div>
          <div className="overview-snapshots">
            <BudgetMini />
          </div>
          <div className="overview-snapshots">
            <SubMini />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
