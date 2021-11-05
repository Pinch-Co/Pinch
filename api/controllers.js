/* eslint-disable no-console */
const {
  Configuration, PlaidApi, PlaidEnvironments,
} = require('plaid');
require('dotenv').config();

const { PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV } = process.env;

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

// ---- Get Link Token ------ ///

const receivePublicToken = async () => {
  const clientUserId = PLAID_CLIENT_ID;
  const publicTokenRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: 'Plaid Test App',
    products: ['auth', 'transactions'],
    language: 'en',
    webhook: 'https://webhook.example.com',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(publicTokenRequest);
    return createTokenResponse.data;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    return console.log('!!create_link_token error!!!', error);
  }
};

// ---- Get Access Token------ ///

const recieveAccessToken = async (request) => {
  const publicToken = request.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    // const accessToken = response.data.access_token;
    // const itemID = response.data.item_id;
    return response.data;
  } catch (error) {
    return console.log('Error getting access token', error);
  }
};

// ---- Get Trasanctions ------ ///

const getTransactions = async (request) => {
  // Pull transactions for the last 30 days
  const { accessToken } = request;
  const TransactionsGetRequest = {
    access_token: accessToken,
    start_date: '2018-01-01',
    end_date: '2020-02-01',
    options: {
      count: 250,
      offset: 0,
    },
  };
  try {
    const response = await client.transactionsGet(TransactionsGetRequest);
    const { transactions } = response.data;
    return transactions;
  } catch (err) {
    return console.log('error retrieving transactions', err);
  }
};

// ---- Get Trasanctions ------ ///

const retrieveBalance = async (request) => {
  const { accessToken } = request;
  const AccountsGetRequest = {
    access_token: accessToken,
  };
  try {
    const response = await client.accountsBalanceGet(AccountsGetRequest);
    const { accounts } = response.data;
    return accounts;
  } catch (error) {
    // handle error
    return console.log('Error retrieving balance', error);
  }
};

module.exports = {
  receivePublicToken,
  getTransactions,
  recieveAccessToken,
  retrieveBalance,
};
