const { gql } = require('apollo-server-express');

const types = gql`
type User {
  id: ID
  firstName: String
  lastName: String
  phone: String
  email: String
  goals:[Goal!]!
  budget: [Budget!]!
  subscriptions: [Subscription!]!
}
type Goal {
  name: String
  currentAmount: Float
  goalAmount: Float
  description: String
}
type Budget {
  name: String
  amount: Float
}
input BudgetInput {
  name: String
  amount: Float
}
type Subscription {
  currentCost: Float
  yearCost: Float
  companyName: String
  billDate: String
}
input SubInput {
  currentCost: Float
  yearCost: Float
  companyName: String
  billDate: String
}
type linkToken {
  expiration: String!
  link_token: String!
  request_id: String!
}
type Query {
  currentUser: User
  authenticated: User
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
  createBudget(id: String! budget: [BudgetInput]): Budget
  updateGoalText(id: String!, original: String, update: String, fieldOfUpdate: String): User
  updateGoalAmount(id: String!, original: Float, update: Float, fieldOfUpdate: String): User
  deleteGoal(id: String!, goalName: String!): User
  addSubscription(id: String!, subscriptions: [SubInput]): Subscription
}
`;

module.exports = types;
