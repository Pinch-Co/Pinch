const resolver = {
  Query: {
    currentUser: (parent, args, context) => context.getUser(),
    authenticated: (parent, args, context) => context.req.user,
  },
  Mutation: {
    logout: (parent, args, context) => context.logout(),
    login: async (parent, { email, password }, context) => {
      // eslint-disable-next-line no-console
      console.log('this is the context', context.req.user);
      const { user } = await context.authenticate('graphql-local', { email, password });
      await context.login(user);
      return { user };
    },
  },

};

module.exports = resolver;
