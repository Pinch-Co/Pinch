const { gql } = require('apollo-server-express');

const types = gql`
type User {
  id: ID
  firstName: String
  lastName: String
  phone: String
  email: String
  goals:[Goal!]!
}
type Goal {
  name: String
  currentAmount: Float
  goalAmount: Float
  description: String
}
type linkToken {
  expiration: String!
  link_token: String!
  request_id: String!
}
type Query {
  currentUser: User
  authenticated: User
  getGoals(email: String!): Goal
  getUserInfo(id: String!): User
  getLinkToken: linkToken
}
type AuthPayload {
  user: User
}
type Mutation {
  login(email: String!, password: String!): AuthPayload
  logout: Boolean
  dummy1(firstName: String!, lastName: String!, username: String!, phone: String!, email: String!, password: String!): User
  signup(firstName: String!, lastName: String!, email: String!, phone: String!, password: String!): AuthPayload
  createGoal(id: String!, name: String, currentAmount: Float, goalAmount: Float, description: String): Goal
}
`;

module.exports = types;
