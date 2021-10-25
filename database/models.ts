/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable import/extensions */
// create database queries in here
// use graphql
const Mongoose = require('mongoose');
const { UserModel } = require('./index.ts');

module.exports.testDatabase = (userInfo) => {
  const newUser = new UserModel(userInfo);
  return newUser.save()
    .then((data) => data)
    .catch((error) => error);
};

module.exports.getUserInfo = (id) => {
  const oid = Mongoose.Types.ObjectId(id.id);
  return UserModel.find({ "_id": oid })
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
