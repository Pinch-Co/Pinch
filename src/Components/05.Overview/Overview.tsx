import * as React from 'react';
import { RiBankLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
// import { RouteComponentProps } from 'react-router-dom';
// import auth from '../../auth/auth';

// interface OverviewProps extends RouteComponentProps<{ name: string }> {

// }

function Overview() {
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
            </div>
            <div className="account-mini-container">
              <div className="account-type-title">
                Credit
              </div>
            </div>
            <div className="account-mini-container">
              <div className="account-type-title">
                Investments
              </div>
            </div>
            <div className="account-mini-container">
              <div className="account-type-title">
                Loans
              </div>
            </div>
          </div>
        </div>
        <div className="overview-snapshot-container">
          <div
            className="overview-snapshots"
          >
            <div className="overview-text">
              <h5 className="snapshot-overall-title">Goals</h5>
              <p className="snapshot-description">small description</p>
              <div>
                <p className="snapshopt-specific-title">Rainy Day Fund</p>
                <hr className="line-break" />
                <p>Savings goal: 500</p>
              </div>
            </div>
            <div className="overview-graphic">
              <img className="graphic" src="https://www.xelplus.com/wp-content/uploads/2019/09/ProgressCircle-20.png" alt="circle" />
            </div>
          </div>
          <div className="overview-snapshots">
            <div className="overview-text">
              <h5 className="snapshot-overall-title">Budget Breakdown</h5>
              <p className="snapshot-description">small description</p>
              <div>
                <p className="snapshopt-specific-title">October Budget</p>
                <hr className="line-break" />
                <p>Savings goal: 500</p>
              </div>
            </div>
            <div className="overview-graphic">
              <img className="graphic" src="http://assets.stickpng.com/images/5a5cbf7a9538462e5a82d543.png" alt="circle" />
            </div>
          </div>
          <div className="overview-snapshots">
            <div className="overview-text">
              <h5 className="snapshot-overall-title">Subscription</h5>
              <p className="snapshot-description">small description</p>
              <div>
                <p className="snapshopt-specific-title">Your Subs</p>
                <hr className="line-break" />
                <p>Savings goal: 500</p>
              </div>
            </div>
            <div className="overview-graphic">
              Pie Chart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
