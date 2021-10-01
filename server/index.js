/* eslint-disable import/extensions */
/* eslint-disable no-console */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { uuid } = require('uuidv4');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');
const User = require('./User.js');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');

// variables for port and session
const PORT = 4000;
const SESSION_SECRECT = 'bad secret';

// passport related code
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const users = User.getUsers();
  const matchingUser = users.find((user) => user.id === id);
  done(null, matchingUser);
});
passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    const users = User.getUsers();
    const matchingUser = users.find((user) => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

// express related code
const app = express();
app.use(session({
  // eslint-disable-next-line no-unused-vars
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
}));
app.use(cors());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(passport.session());

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
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
