/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
