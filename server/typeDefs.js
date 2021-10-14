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
  dummy1(firstName: String!, lastName: String!, username: String!, phone: String!, email: String!, password: String!): User
}
`;

module.exports = types;
