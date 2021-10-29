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

// ---- Get Trasanctions ------ ///

const getTransactions = async (req, res) => {
  // Pull transactions for the last 30 days
  const request = {
    access_token: '**NEEDS ACCESS KEY**',
    start_date: '2018-01-01',
    end_date: '2020-02-01',
  };
  try {
    const response = await client.transactionsGet(request);
    let { transactions } = response.data.transactions;
    const totalTransactions = response.data.total_transactions;
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    while (transactions.length < totalTransactions) {
      const paginatedRequest = {
        access_token: '**NEEDS ACCESS KEY**',
        start_date: '2018-01-01',
        end_date: '2020-02-01',
        options: {
          offset: transactions.length,
        },
      };
      // eslint-disable-next-line no-await-in-loop
      const paginatedResponse = await client.transactionsGet(paginatedRequest);
      transactions = transactions.concat(
        paginatedResponse.data.transactions,
      );
      res.send(transactions);
    }
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log('error getting transactions', err);
  }
};

module.exports = {
  receivePublicToken,
  getTransactions,
};
