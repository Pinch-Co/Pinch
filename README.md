![Logo](https://i.imgur.com/MI5gkUq.png)

# Pinch

Pinch is a personal finance web app that allows you to track savings goals, create budgets, and follow your subscriptions or recurring costs

SIGN IN WITH ADMIN ACCOUNT: 
email: admin@admin.com
password: Password1!

Click here to see deployed site: https://mycatonline.com

## Authors

- [@Greg](https://github.com/gregorymacat)
- [@Francisco](https://github.com/francisco-cmyk)
- [@Seiji](https://github.com/SeijiMatsumoto)
- [@Santiago](https://github.com/sveranicola)
- [@katie](https://github.com/katscap)
- [@Justin](https://github.com/Jcase22)
- [@Griffin](https://github.com/GriffGeorgiadis)


## Tech Stack

**Client:** Typescript, React, React-Router, SCSS, Recharts, Axios, Clearbit Logo API

**Server:** Node, Graphql, Passport.js, Plaid API

**Back-End:** MongoDB, Moment.js, AirBnb Linter, 



## Demo

Login:
![Pinch login](https://i.imgur.com/crTr6n2.png)

The login page for Pinch utilizes passport.js to check if a user exists in the database which redirects to the overview page on success and stores their user id in sessionStorage. The login page also has simple input validation to check for appropriate emails and passwords which saves the backend from any unnecessary calls if the basic criteria are not met. 

___________

Signup: 
![Pinch signup](https://i.imgur.com/29N6Wjm.png)

The signup page (accessible from the login page as well) handles all new users. In the form, we require an email, phone number, and password which are all validated on the Frontend and necessary in order to proceed. Similar to the login page, we added visual warnings in case the appropriate criteria were not met and disabled the create account button. 

___________

Overview: 
![Pinch overview page](https://i.imgur.com/zkPChsW.png)

![Pinch overview page](https://i.imgur.com/Uoz7CQ1.png)

The overview page, much like its name, gives updated ‘snap shots’ of the three major features Pinch offers: Goals, Budgets, and Subscription Tracker. Using the id stored in sessionStorage, a few requests are made from the front end to gather all the necessary data for each mini react component imported into the overview page. The overview page also utilizes the Plaid API to gather all connected account balances and displays them neatly for the user. The functionality offered to the user on this page is clicking on any of the overview widgets and being redirected to its full respective page.

___________

Goals:

![Pinch goals page](https://i.imgur.com/Q8963QD.png)

![Pinch goals page](https://i.imgur.com/giGgRVd.png)

![Pinch goals page](https://i.imgur.com/Mnij3NV.png)

The goals tool allows the user to create their desired savings goals and increment their value every time money has been put aside for that goal. Each goal can be named, given a description and goal amount. As seen in the picture, each goal also has a progress bar which allows the user to get a better idea of how they are progressing before even clicking on the goal. Once a goal is clicked, you can see all its respective information and a circle graph. In order to do this, our devs used Recharts to create dynamic charts based on data from each goal. 

___________

Budget:

![Pinch budget page](https://i.imgur.com/zXG4JBl.png)

![Pinch budget page](https://i.imgur.com/XcyrCa8.png)

![Pinch budget page](https://i.imgur.com/QAbKHOU.png)

The budget tool gives users the ability to create and keep track of expenses per month. You can create a budget by entering an income, and individual expenses with names and amounts. With the help of GraphQL, the budget is sent and stored in our collection within MongoDB. Once a budget is created and stored, the user can choose from either a pie chart or bar chart to visually display the expenses. 
___________

Subscription Tracker:

![Pinch subscriptions page](https://i.imgur.com/hMchHvc.png)

![Pinch subscriptions page](https://i.imgur.com/XHAjzbQ.png)

The subscriptions tracker or cost tracker, gathers users recurring costs data from their connected bank account and displays them by company or merchant. Once a subscription is clicked, a line graph will appear on the right-hand side with their aggregate expenses over a period of the last 50 days.  In order to achieve this, we utilized the Plaid API to gather the user’s expenses in the last 50 days and used simple algorithms to detect repeating costs. These costs were also checked to see if they contain names of companies that are regularly associated with subscriptions like ‘Netflix’, ‘Hulu’, or even ‘Amazon Prime’. Additionally, Recharts was utilized again to create the line chart which dynamically shows the results of each subscription or recurring cost. 

___________


## FAQ

#### Why personal finance app?

Our team wanted to tackle a project that would challenge us, but also motivate us to create an app we would use ourselves. Ultimately we thought personal finance is something every working adult need to consider in their everyday life so why not create an app that helps make it easier.  Utilizing data from your personal bank, Pinch is able to put it all together in one location which allows you to make the best financial decisions for yourself. Therefore, we decided to add three main features: Goal Savings, Budget Breakdown, and Subscription Tracker in order to help you make those important financial decisions. 

#### Why the name Pinch?

Since this a personal finance app, the team thought it was fun to play with the idea of 'pinching pennies' which is what most people think when it comes to saving and budgeting. 


#### Is it free?

Yes its free for the foreseeable future! Financial freedom should be in everyones grasp. 

#### Will other features be implemented?

Yes, the team is considering adding other features like credit score tracker and a subscriptions sharing feature where a user could possible share the cost with friends/family.

