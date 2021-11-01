/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const {
  testDatabase, getUserInfo, createNewGoals, updateGoal, makeBudget, deleteOneGoal, createSubs,
} = require('../database/models.ts');
const {
  receivePublicToken,
  getTransactions,
} = require('../api/controllers.js');

const resolver = {
  Query: {
    currentUser: (parent, args, context) => context.getUser(),
    authenticated: (parent, args, context) => context.req.user,
    getUserInfo: async (parent, args) => {
      const result = await getUserInfo(args);
      return result[0];
    },
    getLinkToken: async (parent, args) => {
      // gets Link Token from Plaid Api
      const result = await receivePublicToken();
      return result;
    },
  },
  Mutation: {
    logout: (parent, args, context) => context.logout(),
    signup: (parent, args, context) => context.addUser(args),
    login: async (parent, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      await context.login(user);
      return { user };
    },
    dummy1: async (parent, args) => {
      const results = testDatabase(args);
      return results;
    },
    createGoal: async (parent, args) => {
      const result = createNewGoals(args);
      return result;
    },
    createBudget: async (parent, args) => {
      const a = JSON.parse(JSON.stringify(args));
      const result = makeBudget(a);
      return result;
    },
    updateGoalText: async (parent, args) => {
      const results = updateGoal(args);
      return results;
    },
    updateGoalAmount: async (parent, args) => {
      const results = updateGoal(args);
      return results;
    },
    deleteGoal: async (parent, args) => {
      const results = deleteOneGoal(args);
      return results;
    },
    addSubscription: async (parent, args) => {
      const results = createSubs(args);
      return results;
    },
  },

};

module.exports = resolver;
