/* eslint-disable max-len */
import * as React from 'react';

function BudgetBreakdown() {
  const [budgets, setBudgets] = React.useState<any>([]);
  const [activeBudget, setActiveBudget] = React.useState<any>([]);
  const [showAdd, setShowAdd] = React.useState<boolean>(true);
  const [numberOfExpenses, setNumberOfExpenses] = React.useState<string[]>([]);
  const [newlyAddedBudget, setNewlyAddedBudget] = React.useState<any>();

  React.useEffect(() => {
    // Dummy data -> query from database later
    setBudgets([
      {
        id: 'aisdfua890sdfu',
        Income: '$5000',
        Rent: '$1200',
        Groceries: '$200',
        'Phone Bill': '$100',
        'Car Payment': '$200',
        Subscriptions: '$50',
      },
      {
        id: 'aisdfuadf90sdfu',
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
        id: 'aisdfua132fu',
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
    if (budgets.length) {
      setActiveBudget(Object.entries(budgets[0]));
      document.querySelector('#bb-btn-0')?.classList.add('bb-active-tab');
      setShowAdd(false);
    }
  }, [budgets]);

  const changeTabs = (tabNum: number): void => {
    if (showAdd) { setShowAdd(false); }
    setActiveBudget(Object.entries(budgets[tabNum]));
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
    // const temp = numberOfExpenses.splice(0);
    // temp.splice(i, 1);
    // setNumberOfExpenses(temp);
    const elToRemove = document.getElementById(`custom-row-${i}`);
    elToRemove?.remove();
  };

  const showText = (): void => {
    const myForm = document.getElementById('myForm');
    const inputs = myForm!.getElementsByTagName('input');
    const temp: any = { Income: '$0' };
    temp.Income = inputs[0].value;
    const tempArr = [];
    for (let i = 1; i < inputs.length; i += 1) {
      if (inputs[i].type === 'text') {
        tempArr.push(inputs[i].value);
      }
    }
    for (let j = 0; j < tempArr.length; j += 2) {
      if (tempArr[j] && tempArr[j + 1]) {
        temp[tempArr[j]] = tempArr[j + 1];
      }
    }
    setNewlyAddedBudget(temp);
  };

  const addNewBudget = (e: any): void => {
    e.preventDefault();
    showText();
  };

  React.useEffect(() => {
    if (newlyAddedBudget) {
      console.log('Newly Added Budget:', newlyAddedBudget);
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
            <div className="bb-budget-bottom">
              {!showAdd ? (
                <>
                  {activeBudget.map((row: any, i: number) => {
                    if (i > 2) {
                      return (
                        <div key={row[i]} className="bb-budget-bottom-row">
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
          <div className="bb-chart" />
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
