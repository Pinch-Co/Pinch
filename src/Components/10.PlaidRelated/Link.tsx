/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React, { useCallback, useState, FunctionComponent } from 'react';
import axios from 'axios';
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from 'react-plaid-link';

interface Props {
  token: string;
}

const PlaidLink: FunctionComponent<Props> = ({ token }) => {
  const [transactions, setTransaction] = useState<any>();
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      // send public_token to server
      console.log(public_token);
      console.log('metadata', metadata);
    },
    [],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    // onExit
    // onEvent
  };

  const { open, ready, error } = usePlaidLink(config);

  const handleClick = () => {
    const access = token;
    axios.get('http://localhost:3000/transactions', { params: { key: access } })
      .then((data) => console.log(data));
  };

  return (
    <div>
      <div>
        <button type="submit" onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
      </div>
      <div>
        {/* <div>
          <button type="submit" onClick={handleClick}>Get Transactions</button>
        </div> */}
      </div>
    </div>
  );
};

export default PlaidLink;
