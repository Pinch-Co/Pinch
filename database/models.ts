/* eslint-disable import/extensions */
// create database queries in here
// use graphql
const User = require('./index.ts');

module.exports.testDatabase = (userInfo) => {
  const newUser = new User(userInfo);
  return newUser.save()
    .then((data) => data)
    .catch((error) => error);
};

// This is an example of userInfo object
// {
//   firstName: 'katie',
//   lastName: 'law',
//   username: 'cactus',
//   phone: 13474757915,
//   email: 'cactus@oasis.com',
//   password: 'skfanejnfa',
// }
// In graphQL query format
// mutation {
//   dummy1( firstName: "katie",
//   lastName: "law",
//   username: "cactus",
//   phone: "13474757915",
//   email: "cactus@oasis.com",
//   password: "skfanejnfa" ) {
//     id
//   }
// }
