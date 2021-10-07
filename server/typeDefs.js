const { gql } = require('apollo-server-express');

const types = gql`
type User {
  id: ID
  firstName: String
  lastName: String
  email: String
}
type Query {
  currentUser: User
  authenticated: User
}
type AuthPayload {
  user: User
}
type Mutation {
  login(email: String!, password: String!): AuthPayload
  logout: Boolean
  signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
}
`;

module.exports = types;
