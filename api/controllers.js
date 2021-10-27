/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const {
  Configuration, PlaidApi, PlaidEnvironments,
} = require('plaid');

const PLAID_CLIENT_ID = '614b5a60b6c9f50010fab929';
// const PLAID_SECRET = '4c968374bb9776ba5918dfddf026bf';
const PLAID_SECRET = '6bd3881b81c286e637a280fbdb6148';
const PLAID_ENV = 'sandbox';

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

const receivePublicToken = async (req, res) => {
  console.log('in this link token');
  const clientUserId = PLAID_CLIENT_ID;
  const reqy = {
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
    const createTokenResponse = await client.linkTokenCreate(reqy);
    // console.log('createTokenResponse', createTokenResponse.data);
    res.send(createTokenResponse.data);
  } catch (error) {
    // handle error
    console.log('!!create_link_token error!!!', error);
  }
};

// ---- Get Trasanctions ------ ///

const getTransactions = async (req, res) => {
  // Pull transactions for the last 30 days
  console.log(req.params);
  // const { token } = req.params.token;
  const request = {
    access_token: 'access-sandbox-793dc34a-c1c9-4690-945f-eb2f7219a617',
    start_date: '2018-01-01',
    end_date: '2020-02-01',
  };
  try {
    const response = await client.transactionsGet(request);
    let { transactions } = response.data.transactions;
    const total_transactions = response.data.total_transactions;
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    while (transactions.length < total_transactions) {
      const paginatedRequest = {
        access_token: 'access-sandbox-793dc34a-c1c9-4690-945f-eb2f7219a617',
        start_date: '2018-01-01',
        end_date: '2020-02-01',
        options: {
          offset: transactions.length,
        },
      };
      const paginatedResponse = await client.transactionsGet(paginatedRequest);
      transactions = transactions.concat(
        paginatedResponse.data.transactions,
      );
      res.send(transactions);
    }
  } catch (err) {
    // handle error
    console.log('error getting transactions', err);
  }
};

module.exports = {
  receivePublicToken,
  getTransactions,
};
