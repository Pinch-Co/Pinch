/* eslint-disable max-len */
import * as React from 'react';

function BudgetBreakdown() {
  const [budgets, setBudgets] = React.useState<any>([]);
  const [activeBudget, setActiveBudget] = React.useState<any>([]);
  const [showAdd, setShowAdd] = React.useState<boolean>(true);
  const [numberOfExpenses, increaseExpenses] = React.useState<string[]>([]);

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
    temp.push('1');
    increaseExpenses(temp);
  };

  const addNewBudget = (e: any): void => {
    e.preventDefault();
    console.log('add new budget');
  };

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
                  <form className="bb-add-form" onSubmit={(e: any) => addNewBudget(e)}>
                    <label htmlFor="bb-add-input-income" className="bb-add-input-group">
                      <div className="bb-input-title">Income (monthly)*</div>
                      <input type="text" id="bb-add-input-income" className="bb-input-field" placeholder="$0" />
                    </label>
                    {/* <label htmlFor="bb-add-input-rent" className="bb-add-input-group">
                      <div className="bb-input-title">Rent</div>
                      <input type="text" id="bb-add-input-rent" className="bb-input-field" placeholder="$0" />
                    </label>
                    <label htmlFor="bb-add-input-groceries" className="bb-add-input-group">
                      <div className="bb-input-title">Groceries</div>
                      <input type="text" id="bb-add-input-groceries" className="bb-input-field" placeholder="$0" />
                    </label> */}
                    <div className="bb-add-custom">
                      <input type="button" className="bb-add-custom-btn" onClick={addExpense} value="add an expense +" />
                      {numberOfExpenses.map((each: string) => (
                        <div className="bb-add-custom-row">
                          <label htmlFor="bb-add-input-custom" className="bb-add-input-group">
                            <div className="bb-input-title">Name</div>
                            <input type="text" id="bb-add-input-custom" className="bb-input-custom-field" placeholder="Miscellaneous" />
                          </label>
                          <label htmlFor="bb-add-input-custom" className="bb-add-input-group">
                            <div className="bb-input-title">Amount</div>
                            <input type="text" id="bb-add-input-custom" className="bb-input-custom-field" placeholder="$0" />
                          </label>
                        </div>
                      ))}
                    </div>
                    <input type="submit" value="Submit" />
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
