const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/pinch');

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  accounts: [{
    accountType: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  }],
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const budgetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  currentAmount: {
    type: Number,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const subscriptionSchema = new Schema({
  currentCost: Number,
  yearCost: Number,
  companyName: String,
  billDate: Date,
  // history: [{
  //   date: Date,
  //   cost: Number,
  // }],
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
  phone: {
    type: String, // must be a string-- graphQL does not support ints larger than 32-bit
    validate: {
      validator(v) {
        return v.length === 11 && typeof +v;
      },
      message: '{VALUE} is not a valid 11 digit phone number',
    },
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 25,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 25,
  },
  profile: {
    gender: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    educationLevel: {
      type: String,
    },
    income: {
      type: Number,
    },
    residentialStatus: {
      type: String,
    },
    Household: {
      adults: {
        type: Number,
      },
      children: {
        type: Number,
      },
    },
  },
  accounts: {
    type: [accountSchema],
  },
  notifications: {
    text: {
      type: Boolean,
    },
    email: {
      type: Boolean,
    },
    subscription: {
      type: Boolean,
    },
  },
  settings: {
    darkMode: {
      type: Boolean,
    },
    securityQuestions: {
      type: [questionSchema],
    },
  },
  goals: {
    type: [goalSchema],
  },
  budget: {
    type: [budgetSchema],
  },
  subscriptions: {
    type: [subscriptionSchema],
  },
  itemId: String,
  accessToken: String,
});

module.exports = {
  UserModel: mongoose.model('User', userSchema),
};
