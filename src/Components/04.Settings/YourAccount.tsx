import * as React from 'react';

function YourAccount() {
  return (
    <div className="tabs-contents">
      <div className="tabs-header-section">
        <div className="tabs-header-title">
          Your Account
        </div>
        <p className="blurb"> All your connected accounts</p>
        <hr className="tabs-section-cutoff" />
      </div>
      <div className="tabs-information-section">
        <div className="account-container">
          <div className="bank-logo">
            <img src="https://i.imgur.com/PgmyDCm.png" alt="bitcoin logo" />
          </div>
          <div className="vertical-divider" />
          <div className="account-text-info">
            <p className="bank-title">Bank of Bitcoin</p>
            <div className="account-name-block">
              <p>Regular Checking Bitcoin Account</p>
              <p>$1,200.00</p>
            </div>
            <div className="account-name-block">
              <p>Regular Savings Bitcoin Account</p>
              <p>$7,200.00</p>
            </div>
          </div>
        </div>
        <div className="account-container">
          <div className="bank-logo">
            <img src="https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png" alt="discover card logo" />
          </div>
          <div className="vertical-divider" />
          <div className="account-text-info">
            <p className="bank-title">Discover</p>
            <div className="account-name-block">
              <p>Discover Plus Ultra</p>
              <p>-$350</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourAccount;
