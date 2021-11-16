/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BudgetCharts from './BudgetCharts';
import AddBudget from './AddBudget';
import MainBudget from './MainBudget';
import AppContext from '../SharedComponents/06.Context/AppContext';

function BudgetBreakdown() {
  const [budget, setBudget] = useState<any>([]);
  const [income, setIncome] = useState<number>(0);
  const [showAdd, setShowAdd] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [editBudget, setEditBudget] = useState<boolean>(false);
  const [numberOfExpenses, setNumberOfExpenses] = useState<string[]>(['1']);
  const [objectId, setObjectId] = useState<string>();
  const [chartType, setChartType] = useState<string>('pie');
  const [sorting, setSorting] = useState<boolean>(false);

  const { userObj } = useContext(AppContext);

  const getData = (): any => {
    axios.post('/graphql', {
      query: `query {
        getUserInfo(id: ${JSON.stringify(objectId)}) {
          budget {
            income
            name
            value
          }
        }
      }`,
    }).then((res) => {
      const data = res.data.data.getUserInfo.budget;
      setBudget(data);
      setIncome(data[0].income);
    }).catch((err) => {
      console.log('GET budget', err);
    });
  };

  const postData = (budg: any): void => {
    axios.post('/graphql', {
      query: `mutation {
        createBudget(
          id: ${JSON.stringify(objectId)},
          budget: ${JSON.stringify(budg).replace(/"([^(")"]+)":/g, '$1:')}) {
          name
        }
      }`,
    }).catch((err) => {
      console.log('POST budget', err);
    });
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // Used to retrieve Object ID of user
    if (userObj.id !== '') {
      const { id } = userObj;
      setObjectId(id);
    }
  }, [userObj]);

  useEffect(() => {
    if (objectId) {
      getData();
    }
  }, [objectId]);

  useEffect(() => {
    if (!sorting) {
      if (budget.length > 0 && JSON.stringify(budget[0]) !== JSON.stringify({ income: null, name: '', value: null })) {
        let sum = 0;
        for (let i = 0; i < budget.length; i += 1) {
          sum += budget[i].value;
        }
        setShowAdd(false);
        setTotal(sum);
        // Post to database
        let filteredBudget = budget.slice(0);
        filteredBudget = filteredBudget.filter((expense: any) => {
          if (expense.value !== '') {
            return true;
          }
          return false;
        });
        postData(filteredBudget);
      } else {
        setTotal(0);
        setShowAdd(true);
      }
    }
    setSorting(false);
  }, [budget]);

  const sortExpenses = (e: any): void => {
    e.preventDefault();
    setSorting(true);
    if (e.target.value === 'alphabetical-AtoZ') {
      const sortedBudget = budget.slice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a.name > b.name) { return 1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'alphabetical-ZtoA') {
      const sortedBudget = budget.slice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a.name < b.name) { return 1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'price-highest') {
      const sortedBudget = budget.slice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a.value < b.value) { return 1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'price-lowest') {
      const sortedBudget = budget.slice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (a.value > b.value) { return 1; }
        return -1;
      });
      console.log(sortedBudget);
      setBudget(sortedBudget);
    }
  };

  const isValidInput = (num: string): boolean => {
    const reg = new RegExp('^[0-9]+$');
    return reg.test(num);
  };

  const setNewBudget = (e: any): any => {
    e.preventDefault();
    const myForm = document.getElementById('bb-form-edit');
    const inputs = myForm!.getElementsByTagName('input');
    const updatedBudget: any = [];
    const numIncome: number = parseInt(income.toString(), 10);

    for (let i = 0; i < inputs.length - 2; i += 2) {
      const each = {
        income: 0,
        name: '',
        value: 0,
      };

      if (inputs[i].type === 'text' && isValidInput(inputs[i + 1].value)) {
        each.income = numIncome;
        each.name = inputs[i].value;
        each.value = parseInt(inputs[i + 1].value, 10);
      }
      if (each.name !== '' && each.value) {
        updatedBudget.push(each);
      }
    }

    if (updatedBudget.length && income > 0 && isValidInput(income.toString())) {
      setBudget(updatedBudget);
      setEditBudget(false);
    } else {
      // eslint-disable-next-line no-alert
      window.alert('Please enter valid inputs.');
    }
  };

  const editAddExpense = (): void => {
    const temp = budget.splice(0);
    temp.push({ income: 0, name: '', value: '' });
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

  const deleteExpense = (e: any, i: number): void => {
    e.preventDefault();
    const elToRemove = document.getElementById(`bb-edit-row-${i}`);
    elToRemove?.remove();
  };

  const deleteBudget = (): void => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete budget?')) {
      setBudget([{ income: null, name: '', value: null }]);
      setShowAdd(true);
    }
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
                  deleteBudget={deleteBudget}
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
          <BudgetCharts chartData={budget} total={total} income={income} setChartType={setChartType} chartType={chartType} />
        </div>
      </div>
    </div>
  );
}

export default BudgetBreakdown;
