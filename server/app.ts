// import express from 'express';
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');
const User = require('./User');

const app = express();
app.use(session({ secret: 'heyyy' }));
app.use(passport.initialize());
app.use(passport.session()); // if session is used
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err: Error) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
  type Query {
    currentUser: User
  }
  type Mutation {
    logout: Boolean
  }
`;

passport.use(
  new GraphQLLocalStrategy((email: string, password: string, done: any) => {
    // Adjust this callback to your needs
    const users = User.getUsers();
    const matchingUser = users.find(
      (user: any) => email === user.email && password === user.password,
    );
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

const resolvers = {
  Query: {
    currentUser: (parent: any, args: any, context: any) => context.getUser(),
  },
  Mutation: {
    logout: (parent: any, args: any, context: any) => context.logout(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => buildContext({ req, res, User }),
});

// await server.start();
server.applyMiddleware({ app, cors: false });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`This app is now listening at http://localhost:${port}`);
});
