/* eslint-disable import/extensions */
/* eslint-disable no-console */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parss
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');
// const graphqlHTTP = require('express-graphql');
const User = require('./User.js');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');

// variables for port and session
const PORT = 4000;
const SESSION_SECRECT = 'bad_secret';

// express related code
const app = express();
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
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(passport.session());

// passport related code
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
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
