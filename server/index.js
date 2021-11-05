/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');
const { UserModel } = require('../database/index.ts');
// const User = require('./User');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// variables for port and session
const PORT = 4000;
const SESSION_SECRECT = 'bad_secret';

// express related code
const app = express();
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  // eslint-disable-next-line no-unused-vars
  genid: (req) => uuidv4(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: true,
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// passport related code
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  // eslint-disable-next-line quote-props
  UserModel.findOne({ 'id': id })
    .then((result) => {
      const matchingUser = result;
      console.log(matchingUser);
      done(null, matchingUser);
    })
    .catch((error) => console.log(error));
});
passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    // eslint-disable-next-line quote-props
    UserModel.findOne({ 'email': email, 'password': password })
      .then((result) => {
        const matched = result;
        const error = matched ? null : new Error('no matching user');
        done(error, matched);
      })
      .catch((error) => console.log('error', error));
  }),
);

// apollo server connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at 1st port: http://localhost:${PORT}`);
});
