/* eslint-disable no-console */
/* eslint-disable max-len */
import * as React from 'react';
import axios from 'axios';

function BudgetBreakdown() {
  const [budget, setBudget] = React.useState<any>([]);
  const [income, setIncome] = React.useState<number>(0);
  const [showAdd, setShowAdd] = React.useState<boolean>(true);
  const [total, setTotal] = React.useState<number>(0);
  const [editBudget, setEditBudget] = React.useState<boolean>(false);
  const [numberOfExpenses, setNumberOfExpenses] = React.useState<string[]>(['1']);

  const getData = (): any => {
    axios.post('/graphql', {
      query: `query {
        getUserInfo(id: "123456789abc") {
          budget {
            name
            amount
          }
        }
      }`,
    }).then((res) => {
      console.log('Query success!');
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
      console.log('Query failed!');
    });
  };

  const postData = (): void => {
    axios.post('/graphql', {
      query: `mutation {
        createBudget(id: "123456789abc",  budget: ${budget}
      }`,
    }).then(() => {
      console.log('Post success!');
    }).catch((err) => {
      console.log('Post failed!');
      console.log(err);
    });
  };

  React.useEffect(() => {
    // Dummy data -> query from database later
    // setBudget(
    //   [
    //     { name: 'Rent', amount: '1200' },
    //     { name: 'Groceries', amount: '200' },
    //     { name: 'Gas', amount: '150' },
    //     { name: 'Pet supplies', amount: '200' },
    //     { name: 'Shopping', amount: '200' },
    //   ],
    // );
    setIncome(8000);
    getData();
  }, []);

  React.useEffect(() => {
    if (budget.length > 0) {
      setShowAdd(false);
      let sum = 0;
      for (let i = 0; i < budget.length; i += 1) {
        sum += parseInt(budget[i].amount, 10);
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
        if (parseInt(a.amount, 10) > parseInt(b.amount, 10)) { return -1; }
        if (parseInt(a.amount, 10) < parseInt(b.amount, 10)) { return 1; }
        return -1;
      });
      setBudget(sortedBudget);
    } else if (e.target.value === 'price-lowest') {
      const sortedBudget = budget.splice(0);
      sortedBudget.sort((a: any, b: any) => {
        if (parseInt(a.amount, 10) < parseInt(b.amount, 10)) { return -1; }
        if (parseInt(a.amount, 10) > parseInt(b.amount, 10)) { return 1; }
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
        amount: '',
      };
      if (inputs[i].type === 'text') {
        each.name = inputs[i].value;
        each.amount = inputs[i + 1].value;
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
                <div className="bb-budget-top">
                  <div className="bb-budget-top-left">
                    <h1>Budget Breakdown</h1>
                    {!editBudget
                      ? (
                        <div className="bb-income">
                          Monthly Income: $
                          {income}
                        </div>
                      )
                      : (
                        <form>
                          Income:
                          <div className="bb-input-box-income">
                            <span className="bb-prefix-income">$</span>
                            <input type="text" id="bb-add-input-income" className="bb-input-field-income" autoComplete="off" defaultValue={income} onChange={(e: any) => setNewIncome(e)} />
                          </div>
                        </form>
                      )}
                    {!editBudget ? (
                      <select onChange={(e: any) => sortExpenses(e)} className="bb-sort" name="sort" id="bb-sort-select">
                        <option defaultValue="Sort">Sort</option>
                        <option value="price-highest">Price Highest to Lowest</option>
                        <option value="price-lowest">Price Lowest to Highest</option>
                        <option value="alphabetical-AtoZ">Alphabetical A to Z</option>
                        <option value="alphabetical-ZtoA">Alphabetical Z to A</option>
                      </select>
                    ) : null}
                  </div>
                  {!editBudget ? <button type="button" className="bb-budget-top-right" onClick={() => setEditBudget(true)}>Edit</button> : <button type="button" className="bb-budget-top-right" onClick={() => setEditBudget(false)}>Cancel</button>}
                </div>
                <div className="bb-budget-middle">
                  {!editBudget
                    ? (
                      <>
                        {
                          budget.map((expense: any, i: number) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={expense.name + i} className="bb-budget-middle-row">
                              <div className="bb-budget-category">
                                {expense.name}
                              </div>
                              <div className="bb-budget-dollars">
                                $
                                {expense.amount}
                              </div>
                            </div>
                          ))
                        }
                        <div className="bb-budget-bottom">
                          <div className="bb-budget-total">
                            <div className="bb-budget-total-title">Total:</div>
                            <div className="bb-budget-total-amount>">
                              $
                              {total.toString()}
                            </div>
                          </div>
                          <div className="bb-budget-difference">
                            <div className="bb-budget-total-title">Remaining:</div>
                            <div className="bb-budget-total-amount>">
                              <div className="bb-income">
                                $
                                {income - total}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                    : (
                      <div className="bb-edit-form">
                        <form className="bb-form-edit" id="bb-form-edit" onSubmit={(e: any) => setNewBudget(e)}>
                          {budget.map((row: any, i: number) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div className="bb-add-custom-row" key={row.name + i} id={`bb-edit-row-${i}`}>
                              <label className="bb-add-input-group" htmlFor="bb-add-input-income">
                                <div className="bb-input-title">Name</div>
                                <div className="bb-input-box">
                                  <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" defaultValue={row.name} />
                                </div>
                              </label>
                              <label htmlFor="bb-add-input-income" className="bb-add-input-group">
                                <div className="bb-input-title">Amount</div>
                                <div className="bb-input-box">
                                  <span className="bb-prefix">$</span>
                                  <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" defaultValue={row.amount} />
                                </div>
                              </label>
                              <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}>Delete Expense</button>
                            </div>
                          ))}
                          <input type="submit" onClick={(e: any) => setNewBudget(e)} className="bb-submit-custom-btn" value="Update" />
                        </form>
                      </div>
                    )}

                </div>
              </div>
            )
            : (
              // Add new budget
              <div className="bb-budget-box">
                <div className="bb-budget-top">
                  <h1>Create new budget</h1>
                </div>
                <div className="bb-edit-form">
                  <form className="bb-add-input-group">
                    <div className="bb-input-title">Monthly Income:</div>
                    <div className="bb-input-box">
                      <span className="bb-prefix">$</span>
                      <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" onChange={(e: any) => setNewIncome(e)} />
                    </div>
                  </form>
                  <form className="bb-form-edit" id="bb-form-edit" onSubmit={(e: any) => setNewBudget(e)}>
                    {numberOfExpenses.map((row: any, i: number) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className="bb-add-custom-row" key={row + i} id={`bb-edit-row-${i}`}>
                        <label className="bb-add-input-group" htmlFor="bb-add-input-income">
                          <div className="bb-input-title">Expense Name</div>
                          <div className="bb-input-box">
                            <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" />
                          </div>
                        </label>
                        <label htmlFor="bb-add-input-income" className="bb-add-input-group">
                          <div className="bb-input-title">Amount</div>
                          <div className="bb-input-box">
                            <span className="bb-prefix">$</span>
                            <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" />
                          </div>
                        </label>
                        {i > 0 ? <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}><img src="https://cdn0.iconfinder.com/data/icons/octicons/1024/trashcan-512.png" alt="delete icon" className="bb-delete-icon" /></button> : null}
                      </div>
                    ))}
                    <input type="submit" onClick={(e: any) => setNewBudget(e)} className="bb-submit-custom-btn" value="Submit" />
                    <button type="button" className="bb-add-custom-btn" onClick={addExpense}>Add +1 expense</button>
                  </form>
                </div>
              </div>
            )}
        </div>
        <div className="bb-right">
          <div className="bb-chart">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Turkish_general_election%2C_2007_pie_chart.png" alt="pie chart" className="bb-pie-chart" />
          </div>
          <select className="bb-chart-type">
            <option value="Pie Chart">Pie Chart</option>
            <option value="Line Graph">Line Graph</option>
            <option value="Bar Graph">Bar Graph</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default BudgetBreakdown;
