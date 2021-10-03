// // import express from 'express';
// const express = require('express');
// const path = require('path');
// const session = require('express-session');
// const { uuid } = require('uuidv4');
// const passport = require('passport');
// const { ApolloServer } = require('apollo-server-express');
// const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');
// const User = require('./User');
// const typeDefs = require('./typeDefs');
// const resolvers = require('./resolvers');

// const clientId = uuid();
// const port = 3000;

// const app = express();
// app.use(session({
//   genid: (req: any) => clientId,
//   secret: 'bad secret',
//   resave: false,
//   saveUninitizialized: false,
//   cookie: { secure: true },
// }));
// app.use(passport.initialize());
// app.use(passport.session()); // if session is used

// app.use('/', express.static(path.join(__dirname, '../public')));

// app.get('/*', (req: any, res: any) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'), (err: Error) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// passport.use(
//   new GraphQLLocalStrategy((email: string, password: string, done: any) => {
//     // Adjust this callback to your needs
//     const users = User.getUsers();
//     const matchingUser = users.find(
//       (user: any) => email === user.email && password === user.password,
//     );
//     const error = matchingUser ? null : new Error('no matching user');
//     done(error, matchingUser);
//   }),
// );

// // const server = new ApolloServer({
// //   typeDefs,
// //   resolvers,
// //   context: ({ req, res }: any) => buildContext({ req, res, User }),
// // });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }: any) => ({
//     getUser: () => req.user,
//     logout: () => req.logout(),
//   }),
//   playground: {
//     settings: {
//       'request.credentials': 'same-origin',
//     },
//   },
// });

// // await server.start();
// server.applyMiddleware({ app, cors: false });

// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`This app is now listening at http://localhost:${port}`);
// });
