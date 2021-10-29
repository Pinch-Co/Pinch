/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable import/extensions */
// create database queries in here
// use graphql
const Mongoose = require('mongoose');
const { UserModel } = require('./index.ts');

// ------------------------------------------  Test Model //
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
module.exports.testDatabase = (userInfo) => {
  // test resolver to connect DB to Graphql
  const newUser = new UserModel(userInfo);
  return newUser.save()
    .then((data) => data)
    .catch((error) => error);
};
// ------------------------------------------  END: Test Model //
// ------------------------------------------  Get User Collection //
module.exports.getUserInfo = (id) => {
  // returns large user collection with all fields
  // This is an example Graphql Query to retrieve the entire user
  // collection for that user the id is the objectId that belongs to
  // that collection ** must be changed **
  // query{
  //   getUserInfo( id: "617b4ab18042428e32405a6e") {
  //      id
  //      firstName
  //      lastName
  //      phone
  //      email
  //        goals{
  //         name
  //         currentAmount
  //         goalAmount
  //         description
  //      }
  //     budget {
  //       name
  //       amount
  //    }
  //   }
  // }
  const oid = Mongoose.Types.ObjectId(id.id);
  return UserModel.find({ "_id": oid })
    .then((data) => data)
    .catch((error) => error);
};
// ------------------------------------------  END: Get User Collection //
// ------------------------------------------ Create new Goal //
module.exports.createNewGoals = (obj) => {
  // this creates Goals
  // This is an example Graphql query that can be made from the front end
  // below the object ID has to be the users ID
  // Strings must be in quotes and Floats are accepted
  // These goals are stored in a nested array within the User collection
  // mutation{
  //   createGoal( id: "617b4ab18042428e32405a6e"
  //  name: "Rainy Day Fund"
  //  currentAmount: 17.45
  //  goalAmount: 500
  //  description: "for a rainy day") {
  //    currentAmount
  //  }
  // }
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
    .catch((error) => console.log(error));
};
// ------------------------------------------ END: Create new Goal //
// ------------------------------------------ Update an existing Goal //
// This is an example Graphql query to put on the front end for goals
// Object id must be specific to the user
// Because graphql is strongly typed, there are several functions written out here
// since we cannot dynamically change values or fields through graphl
// THIS MUTATION: updates String/Text type fields
// requires the original value, the new udpated value, and the name of field being updated
// Ex: goal name is being updated here, but can be used for description as well
// mutation{
//   updateGoalText(id: "617b4ab18042428e32405a6e"
//    original: "new car fund"
//    update: "New Car Fund"
//    fieldOfUpdate: "name") {
//    firstName
//   }
// }
// Ex: This mutation is for integer/float types being updated for the specific goal
// mutation{
//   updateGoalAmount(id: "617b4ab18042428e32405a6e"
//    original: 200.44
//    update: 340.40
//    fieldOfUpdate: "currentAmount") {
//    firstName
//   }
// }

module.exports.updateGoal = (obj) => {
  // this creates Goals
  const {
    id,
    original,
    update,
    fieldOfUpdate,
  } = obj;

  // console.log('passed in obj', obj);
  if (fieldOfUpdate === "name") {
    const transID = Mongoose.Types.ObjectId(id);
    UserModel.updateOne({ "_id": transID, "goals.name": original }, {
      $set: {
        "goals.$.name": update,
      },
    })
      .then((data) => { console.log(data); return "Successfully updated in DB"; })
      .catch((error) => console.log(error));
  }

  if (fieldOfUpdate === "description") {
    const transID = Mongoose.Types.ObjectId(id);
    UserModel.updateOne({ "_id": transID, "goals.description": original }, {
      $set: {
        "goals.$.description": update,
      },
    })
      .then((data) => { console.log(data); return "Successfully updated in DB"; })
      .catch((error) => console.log(error));
  }

  if (fieldOfUpdate === "currentAmount") {
    const transID = Mongoose.Types.ObjectId(id);
    UserModel.updateOne({ "_id": transID, "goals.currentAmount": original }, {
      $set: {
        "goals.$.currentAmount": update,
      },
    })
      .then((data) => { console.log(data); return "Successfully updated in DB"; })
      .catch((error) => console.log(error));
  }

  if (fieldOfUpdate === "goalAmount") {
    const transID = Mongoose.Types.ObjectId(id);
    UserModel.updateOne({ "_id": transID, "goals.goalAmount": original }, {
      $set: {
        "goals.$.goalAmount": update,
      },
    })
      .then((data) => { console.log(data); return "Successfully updated in DB"; })
      .catch((error) => console.log(error));
  }
};
// ------------------------------------------ END: Update an existing Goal //
// ------------------------------------------  Delete One Goal //
// This is the delete goal query to be made on the front end
// object id must be specific to the user
// the goal name is necessary to match what is in database
// only Strings are accepted here
// mutation {
//   deleteGoal(id: "617b4ab18042428e32405a6e"
//   goalName: "New Car Fund") {
//     lastName
//   }
// }

module.exports.deleteOneGoal = (obj) => {
  const {
    id,
    goalName,
  } = obj;

  const transID = Mongoose.Types.ObjectId(id);
  UserModel.update({ "_id": transID }, {
    $pull: {
      "goals": { "name": goalName },
    },
  })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
// ------------------------------------------  END: Delete One Goal //
// ------------------------------------------ Create one Budget //
// This is an create budget query that must be made on the front end
// object id must be specific to the user
// Since only budget will be rendered on screen, all expenses are pushed into
// one array on the User collection.
// names must be strings and amounts must be float types
// When deleting an expense, a whole new array is set in the nested document within Mongodb
// therefore it makes sense to just resend this query through axios on the front end
// mutation{
//   createBudget( id: "617b4ab18042428e32405a6e"
//   budget: [{name: "car", amount: 200.22}, {name: "trash", amount: 40}]) {
//    name
//  }
// }

module.exports.makeBudget = (obj) => {
  // this creates Budgets
  const {
    id,
    budget,
  } = obj;

  const transID = Mongoose.Types.ObjectId(id);
  UserModel.updateOne({ "_id": transID }, {
    $set: {
      "budget": budget,
    },
  })
    .then((data) => data)
    .catch((error) => console.log(error));
};
// ------------------------------------------  END: Create one Budget //
// ------------------------------------------ Create Subscription //
module.exports.createSubs = (obj) => {
  // this creates Budgets
  // This is an create subscription query that must be made on the front end
  // object id must be specific to the user
  // Ex:
  // mutation{
  //   addSubscription( id: "617b4ab18042428e32405a6e"
  //   subscriptions: [{currentCost: 30.23, yearCost: 140.00, companyName: "Univision", billDate:
  // "11-19-21"}]) {
  //    billDate
  //  }
  // }

  const {
    id,
    subscriptions,
  } = obj;

  const transID = Mongoose.Types.ObjectId(id);
  UserModel.updateOne({ "_id": transID }, {
    $set: {
      "subscriptions": subscriptions,
    },
  })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
// ------------------------------------------ END: Create one Budget //
