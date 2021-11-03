/* eslint-disable no-console */
/* eslint-disable max-len */
import * as React from 'react';
import axios from 'axios';
import BudgetCharts from './BudgetCharts';
import AddBudget from './AddBudget';
import MainBudget from './MainBudget';

function BudgetBreakdown() {
  const [budget, setBudget] = React.useState<any>([]);
  const [income, setIncome] = React.useState<number>(0);
  const [showAdd, setShowAdd] = React.useState<boolean>(true);
  const [total, setTotal] = React.useState<number>(0);
  const [editBudget, setEditBudget] = React.useState<boolean>(false);
  const [numberOfExpenses, setNumberOfExpenses] = React.useState<string[]>(['1']);
  const [objectId, setObjectId] = React.useState<string>();

  const getData = (): any => {
    axios.post('/graphql', {
      query: `query {
        getUserInfo(id: ${JSON.stringify(objectId)}) {
          budget {
            name
            value
          }
        }
      }`,
    }).then((res) => {
      const data = res.data.data.getUserInfo.budget;
      setBudget(data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const postData = (): void => {
    axios.post('/graphql', {
      query: `mutation {
        createBudget(
          id: ${JSON.stringify(objectId)},
          budget: ${JSON.stringify(budget).replace(/"([^(")"]+)":/g, '$1:')}) {
          name
        }
      }`,
    }).then(() => {
      setShowAdd(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  React.useEffect(() => {
    // Dummy data -> query from database later
    // setBudget(
    //   [
    //     { name: 'Rent', value: 1200 },
    //     { name: 'Groceries', value: 200 },
    //     { name: 'Gas', value: 150 },
    //     { name: 'Pet supplies', value: 200 },
    //     { name: 'Shopping', value: 200 },
    //   ],
    // );
    setIncome(8000);
    setObjectId('6182bc611fb1249632b3107a');
  }, []);

  React.useEffect(() => {
    // Used to retrieve Object ID of user
    if (objectId) {
      getData();
    }
  }, [objectId]);

  React.useEffect(() => {
    if (budget.length > 0) {
      // setShowAdd(false);
      let sum = 0;
      for (let i = 0; i < budget.length; i += 1) {
        sum += budget[i].value;
      }
      setTotal(sum);
      // Post to database
      postData();
    } else {
      setShowAdd(true);
    }
  }, [budget]);

  const deleteExpense = (e: any, i: number): void => {
    e.preventDefault();
    const elToRemove = document.getElementById(`bb-edit-row-${i}`);
    elToRemove?.remove();
  };

  const sortExpenses = (e: any): void => {
    e.preventDefault();
    if (e.target.value === 'alphabetical-AtoZ') {
      const sortedBudget = budget.splice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'alphabetical-ZtoA') {
      const sortedBudget = budget.splice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a.name < b.name) { return 1; }
        if (a.name > b.name) { return -1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'price-highest') {
      const sortedBudget = budget.splice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a > b) { return -1; }
        if (a < b) { return 1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'price-lowest') {
      const sortedBudget = budget.splice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return -1;
      });
      setBudget(sortedBudget);
    }
  };

  const setNewBudget = (e: any): any => {
    e.preventDefault();
    const myForm = document.getElementById('bb-form-edit');
    const inputs = myForm!.getElementsByTagName('input');
    const updatedBudget: any = [];
    for (let i = 0; i < inputs.length - 2; i += 2) {
      const each = {
        name: '',
        value: 0,
      };
      if (inputs[i].type === 'text') {
        each.name = inputs[i].value;
        each.value = parseInt(inputs[i + 1].value, 10);
      }
      if (each.name !== '') {
        updatedBudget.push(each);
      }
    }

    if (updatedBudget.length && income > 0) {
      setBudget(updatedBudget);
      setEditBudget(false);
    } else {
      // eslint-disable-next-line no-alert
      window.alert('Please fill out all fields');
    }
  };

  const editAddExpense = (): void => {
    const temp = budget.splice(0);
    temp.push({ name: '', value: '' });
    setBudget(temp);
  };

  const setNewIncome = (e: any): void => {
    e.preventDefault();
    setIncome(e.target.value);
  };

  const addExpense = (): void => {
    const temp = numberOfExpenses.splice(0);
    temp.push('1');
    setNumberOfExpenses(temp);
  };

  return (
    <div className="bb-container">
      <div className="bb-mid-div">
        <div className="bb-left">
          {!showAdd
            ? (
              <div className="bb-budget-box">
                <MainBudget
                  editBudget={editBudget}
                  income={income}
                  setNewIncome={setNewIncome}
                  sortExpenses={sortExpenses}
                  setEditBudget={setEditBudget}
                  total={total}
                  setNewBudget={setNewBudget}
                  budget={budget}
                  deleteExpense={deleteExpense}
                  editAddExpense={editAddExpense}
                />
              </div>
            )
            : (
              // Add new budget
              <div className="bb-budget-box">
                <AddBudget setNewIncome={setNewIncome} setNewBudget={setNewBudget} numberOfExpenses={numberOfExpenses} deleteExpense={deleteExpense} addExpense={addExpense} />
              </div>
            )}
        </div>
        <div className="bb-right">
          <BudgetCharts chartData={budget} />
        </div>
      </div>
    </div>
  );
}

export default BudgetBreakdown;
