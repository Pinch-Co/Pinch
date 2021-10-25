import * as React from 'react';

function BudgetBreakdown() {
  const [budgets, setBudgets] = React.useState<any>([]);
  const [activeBudget, setActiveBudget] = React.useState<any>([]);

  React.useEffect(() => {
    // Dummy data -> query from database later
    setBudgets([
      [
        ['Rent', '$1200'],
        ['Groceries', '$200'],
        ['Phone Bill', '$100'],
        ['Car Payment', '$200'],
        ['Subscriptions', '$50'],
      ],
      [
        ['Rent', '$1900'],
        ['Groceries', '$300'],
        ['Phone Bill', '$150'],
        ['Car Payment', '$400'],
        ['Subscriptions', '$80'],
        ['Groceries', '$300'],
        ['Phone Bill', '$150'],
        ['Car Payment', '$400'],
        ['Subscriptions', '$80'],
        ['Subscriptions', '$80'],
        ['Groceries', '$300'],
        ['Phone Bill', '$150'],
        ['Car Payment', '$400'],
        ['Subscriptions', '$80'],
        ['Subscriptions', '$80'],
        ['Groceries', '$300'],
        ['Phone Bill', '$150'],
        ['Car Payment', '$400'],
        ['Subscriptions', '$80'],
      ],
      [
        ['Rent', '$1900'],
        ['Groceries', '$300'],
        ['Subscriptions', '$80'],
      ],
    ]);
  }, []);

  React.useEffect(() => {
    if (budgets.length) {
      setActiveBudget(budgets[0]);
    }
    document.querySelector('#bb-btn-0')?.classList.add('bb-active-tab');
  }, [budgets]);

  const changeTabs = (tabNum: number): void => {
    setActiveBudget(budgets[tabNum]);
    for (let i = 0; i < budgets.length; i += 1) {
      document.querySelector(`#bb-btn-${i}`)?.classList.remove('bb-active-tab');
    }
    document.querySelector(`#bb-btn-${tabNum}`)?.classList.add('bb-active-tab');
  };

  return (
    <div className="bb-container">
      <div className="bb-mid-div">
        <div className="bb-left">
          <div className="bb-tabs">
            {budgets.map((budget: any, i: number) => (
              <button key={budget[i][1]} id={`bb-btn-${i}`} type="button" className="bb-tab" onClick={() => changeTabs(i)}>
                Budget
                {' '}
                {i + 1}
              </button>
            ))}
            <button type="button" className="bb-tab">Add +</button>
          </div>
          <div className="bb-budget-box">
            <div className="bb-budget-top">
              <div className="bb-budget-top-left">
                <div className="bb-income">Income: $5,000/mo</div>
                <select className="bb-sort" name="sort">
                  <option defaultValue="Sort">Sort</option>
                  <option value="price">Price</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              <div className="bb-budget-top-right">Edit</div>
            </div>
            <div className="bb-budget-bottom">
              {activeBudget.map((row: any, i: number) => (
                <div key={row[i]} className="bb-budget-bottom-row">
                  <ul>
                    <li className="bb-budget-category">
                      {row[0]}
                    </li>
                  </ul>
                  <div className="bb-budget-dollars">{row[1]}</div>
                </div>
              ))}
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
