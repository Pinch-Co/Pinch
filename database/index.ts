// create database schema in here
// use mongoose
import mongoose from 'mongoose';

const { Schema } = mongoose;

const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const budgetSchema = new Schema({
  income: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  groceries: {
    type: Number,
    required: true,
  },
  expenses: [{
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  }],
});

const subscriptionSchema = new Schema({
  currentCost: Number,
  yearCost: Number,
  type: String,
  billDate: Date,
  history: [{
    // date should be the date that the sub cost changed. (MM/YYYY)
    date: Date,
    cost: Number,
  }],
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10,
  },
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 25,
  },
  settings: {

  },
  goals: {
    type: [goalSchema],
  },
  budgets: {
    type: [budgetSchema],
  },
  subscriptions: {
    type: [subscriptionSchema],
  },
  itemId: String,
  accessToken: String,
});
