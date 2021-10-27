/* eslint-disable max-len */
import * as React from 'react';

function BudgetBreakdown() {
  const [budgets, setBudgets] = React.useState<any>([]);
  const [activeBudget, setActiveBudget] = React.useState<any>([]);
  const [activeTotal, setActiveTotal] = React.useState<number>(0);
  const [showAdd, setShowAdd] = React.useState<boolean>(true);
  const [numberOfExpenses, setNumberOfExpenses] = React.useState<string[]>(['']);
  const [newlyAddedBudget, setNewlyAddedBudget] = React.useState<any>();
  const [justAdded, setJustAdded] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Dummy data -> query from database later
    setBudgets([
      {
        Income: '$5000',
        Rent: '$1200',
        Groceries: '$200',
        'Phone Bill': '$100',
        'Car Payment': '$200',
        Subscriptions: '$50',
      },
      {
        Income: '$4000',
        Rent: '$1900',
        Groceries: '$300',
        'Phone Bill': '$150',
        'Car Payment': '$400',
        Subscriptions: '$80',
        Water: '$40',
        Tuition: '$1000',
      },
      {
        Income: '$9000',
        Rent: '$1900',
        Groceries: '$300',
        Subscriptions: '$80',
      },
    ]);
  }, []);

  const changeToAdd = (): void => {
    setShowAdd(true);
    for (let i = 0; i < budgets.length; i += 1) {
      document.querySelector(`#bb-btn-${i}`)?.classList.remove('bb-active-tab');
    }
    document.querySelector('#bb-add-btn')?.classList.add('bb-active-tab');
  };

  React.useEffect(() => {
    if (justAdded) {
      setActiveBudget(Object.entries(budgets[budgets.length - 1]));
      document.querySelector(`#bb-btn-${budgets.length - 1}`)?.classList.add('bb-active-tab');
      document.querySelector('#bb-btn-0')?.classList.remove('bb-active-tab');
      document.querySelector('#bb-add-btn')?.classList.remove('bb-active-tab');
      setShowAdd(false);
      const budgetsArr = Object.entries(budgets[budgets.length - 1]);
      let total = 0;
      for (let j = 1; j < budgetsArr.length; j += 1) {
        const budget: any = budgetsArr[j][1];
        total += parseInt(budget.slice(1), 10);
      }
      setActiveTotal(total);
      setJustAdded(false);
    } else if (budgets.length) {
      setActiveBudget(Object.entries(budgets[0]));
      document.querySelector('#bb-btn-0')?.classList.add('bb-active-tab');
      setShowAdd(false);
      const budgetsArr = Object.entries(budgets[0]);
      setActiveBudget(budgetsArr);
      let total = 0;
      for (let j = 2; j < budgetsArr.length; j += 1) {
        const budget: any = budgetsArr[j][1];
        total += parseInt(budget.slice(1), 10);
      }
      setActiveTotal(total);
    }
  }, [budgets]);

  const changeTabs = (tabNum: number): void => {
    if (showAdd) { setShowAdd(false); }
    const budgetsArr = Object.entries(budgets[tabNum]);
    setActiveBudget(budgetsArr);
    let total = 0;
    for (let j = 1; j < budgetsArr.length; j += 1) {
      const budget: any = budgetsArr[j][1];
      total += parseInt(budget.slice(1), 10);
    }
    setActiveTotal(total);
    for (let i = 0; i < budgets.length; i += 1) {
      document.querySelector(`#bb-btn-${i}`)?.classList.remove('bb-active-tab');
    }
    document.querySelector('#bb-add-btn')?.classList.remove('bb-active-tab');
    document.querySelector(`#bb-btn-${tabNum}`)?.classList.add('bb-active-tab');
  };

  const addExpense = (): void => {
    const temp = numberOfExpenses.splice(0);
    if (!temp.length) {
      temp.push('0');
    } else {
      temp.push((parseInt(temp[temp.length - 1], 10) + 1).toString());
    }
    setNumberOfExpenses(temp);
  };

  const deleteExpense = (e: any, i: number): void => {
    e.preventDefault();
    const elToRemove = document.getElementById(`custom-row-${i}`);
    elToRemove?.remove();
  };

  const showText = (): void => {
    const myForm = document.getElementById('myForm');
    const inputs = myForm!.getElementsByTagName('input');
    const temp: any = {};
    temp.Income = `$${inputs[0].value}`;
    const tempArr = [];
    for (let i = 1; i < inputs.length; i += 1) {
      if (inputs[i].type === 'text') {
        tempArr.push(inputs[i].value);
      }
    }
    for (let j = 0; j < tempArr.length; j += 2) {
      if (tempArr[j] && tempArr[j + 1]) {
        temp[tempArr[j]] = `$${tempArr[j + 1]}`;
      }
    }
    setNewlyAddedBudget(temp);
  };

  const addNewBudget = (e: any): void => {
    e.preventDefault();
    const myForm = document.getElementById('myForm');
    const inputField = myForm!.getElementsByTagName('input')[0];
    const reg = /^\d+$/;
    if (reg.test(inputField.value)) {
      showText();
    } else {
      window.alert('Please enter a valid income value');
      inputField.focus();
    }
  };

  React.useEffect(() => {
    if (newlyAddedBudget) {
      const temp = budgets.splice(0);
      temp.push(newlyAddedBudget);
      setBudgets(temp);
      setJustAdded(true);
    }
  }, [newlyAddedBudget]);

  return (
    <div className="bb-container">
      <div className="bb-mid-div">
        <div className="bb-left">
          <div className="bb-tabs">
            {budgets ? budgets.map((budget: any, i: number) => (
              <button key={budget.id} id={`bb-btn-${i}`} type="button" className="bb-tab" onClick={() => changeTabs(i)}>
                Budget
                {' '}
                {i + 1}
              </button>
            )) : null}
            <button type="button" className="bb-tab" id="bb-add-btn" onClick={changeToAdd}>Add +</button>
          </div>
          <div className="bb-budget-box">
            {!showAdd ? (
              <div className="bb-budget-top">
                <>
                  <div className="bb-budget-top-left">
                    {activeBudget.map((row: any) => {
                      if (row[0] === 'Income') {
                        return (
                          <div className="bb-income" key={row[1]}>
                            Income:
                            {' '}
                            {row[1]}
                            /mo
                          </div>
                        );
                      }
                      return null;
                    })}
                    <select className="bb-sort" name="sort">
                      <option defaultValue="Sort">Sort</option>
                      <option value="price">Price</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                  <div className="bb-budget-top-right">Edit</div>
                </>
              </div>
            ) : null}
            <div className="bb-budget-middle">
              {!showAdd ? (
                <>
                  {activeBudget.map((row: any, i: number) => {
                    if (i > 0) {
                      return (
                        <div key={row[i]} className="bb-budget-middle-row">
                          <ul>
                            <li className="bb-budget-category">
                              {row[0]}
                            </li>
                          </ul>
                          <div className="bb-budget-dollars">{row[1]}</div>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="bb-budget-bottom">
                    <div className="bb-budget-total">
                      <div className="bb-budget-total-title">Total:</div>
                      <div className="bb-budget-total-amount>">
                        $
                        {activeTotal}
                      </div>
                    </div>
                    <div className="bb-budget-difference">
                      <div className="bb-budget-total-title">Remaining:</div>
                      <div className="bb-budget-total-amount>">
                        {activeBudget.map((row: any) => {
                          if (row[0] === 'Income') {
                            return (
                              <div className="bb-income" key={row[1]}>
                                $
                                {parseInt(row[1].slice(1), 10) - activeTotal}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bb-add-body">
                  <h1 className="bb-add-title">Create a New Budget</h1>
                  <form className="bb-add-form" id="myForm" onSubmit={(e: any) => addNewBudget(e)}>
                    <label htmlFor="bb-add-input-income" className="bb-add-input-group">
                      <div className="bb-input-title">Income (monthly)*</div>
                      <div className="bb-input-box">
                        <span className="bb-prefix">$</span>
                        <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" />
                      </div>
                    </label>
                    <div className="bb-add-custom">
                      {numberOfExpenses.map((each: string, i: number) => (
                        <div className="bb-add-custom-row" id={`custom-row-${i}`}>
                          <label htmlFor="bb-add-input-custom" className="bb-add-input-group">
                            <div className="bb-input-title">Name</div>
                            <div className="bb-input-box">
                              <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" />
                            </div>
                          </label>
                          <label htmlFor="bb-add-input-custom" className="bb-add-input-group">
                            <div className="bb-input-title">Amount</div>
                            <div className="bb-input-box">
                              <span className="bb-prefix">$</span>
                              <input type="text" id="bb-add-input-custom" className="bb-input-field" autoComplete="off" />
                            </div>
                          </label>
                          <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}>X</button>
                        </div>
                      ))}
                    </div>
                    <div className="bb-buttons-div">
                      <button type="button" className="bb-add-custom-btn" onClick={addExpense}>Add an expense +</button>
                      <input type="submit" className="bb-submit-custom-btn" value="Submit" />
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
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
