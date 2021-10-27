/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { PLAID_CLIENT_ID, PLAID_SECRET } = require('./key');
// const PLAID_CLIENT_ID = '614b5a60b6c9f50010fab929';
// const PLAID_SECRET = '4c968374bb9776ba5918dfddf026bf';
// const PLAID_SANDBOX = '6bd3881b81c286e637a280fbdb6148';

const app = express();
const port = 3000;

const {
  receivePublicToken,
  getTransactions,
} = require('./controllers');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post('/api/create_link_token', receivePublicToken);
app.get('/transactions', getTransactions);

app.listen(port, () => {
  console.log(`🚀 Server ready at 2nd port: http://localhost:${port}`);
});
