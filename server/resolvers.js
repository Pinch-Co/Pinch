/* eslint-disable import/extensions */
const { testDatabase, getUserInfo, updateGoals } = require('../database/models.ts');

const resolver = {
  Query: {
    currentUser: (parent, args, context) => context.getUser(),
    authenticated: (parent, args, context) => context.req.user,
    getUserInfo: async (parent, args) => {
      const result = await getUserInfo(args);
      // mongo returns an arrray
      return result[0];
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
    updateGoal: async (parent, args) => {
      const result = updateGoals(args);
      return result;
    },
  },

};

module.exports = resolver;
