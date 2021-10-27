/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable import/extensions */
// create database queries in here
// use graphql
const Mongoose = require('mongoose');
const { UserModel } = require('./index.ts');

module.exports.testDatabase = (userInfo) => {
  // test resolver to connect DB to Graphql
  const newUser = new UserModel(userInfo);
  return newUser.save()
    .then((data) => data)
    .catch((error) => error);
};

module.exports.getUserInfo = (id) => {
  // returns large user collection with all fields
  const oid = Mongoose.Types.ObjectId(id.id);
  return UserModel.find({ "_id": oid })
    .then((data) => data)
    .catch((error) => error);
};

module.exports.createGoals = (obj) => {
  // this creates Goals
  const {
    id,
    name,
    currentAmount,
    goalAmount,
    description,
  } = obj;

  const transID = Mongoose.Types.ObjectId(id);
  UserModel.updateOne({ "_id": transID }, {
    $push: {
      "goals": {
        "name": name,
        "currentAmount": currentAmount,
        "goalAmount": goalAmount,
        "description": description,
      },
    },
  })
    .then((data) => data)
    .catch((error) => error);
};

module.exports.makeBudget = (obj) => {
  // this creates Goals
  const {
    id,
    income,
    rent,
    groceries,
    expenses,
  } = obj;

  console.log(expenses[0]);

  const transID = Mongoose.Types.ObjectId(id);
  UserModel.updateOne({ "_id": transID }, {
    $push: {
      "budgets": {
        "income": income,
        "rent": rent,
        "groceries": groceries,
      },
    },
  })
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

// mutation{
//   updateGoal( id: "617735ace6e0c4ea1b5b3b73"
//  name: "Rainy Day Fund"
//  currentAmount: 17.45
//  goalAmount: 500
//  description: "for a rainy day") {
//    currentAmount
//  }
// }
