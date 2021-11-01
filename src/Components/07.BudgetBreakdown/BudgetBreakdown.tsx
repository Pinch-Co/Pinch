/* eslint-disable max-len */
import * as React from 'react';

function BudgetBreakdown() {
  const [budget, setBudget] = React.useState<any>([]);
  const [income, setIncome] = React.useState<number>(0);
  const [showAdd, setShowAdd] = React.useState<boolean>(true);
  const [total, setTotal] = React.useState<number>(0);
  const [editBudget, setEditBudget] = React.useState<boolean>(false);
  const [numberOfExpenses, setNumberOfExpenses] = React.useState<string[]>(['1']);

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
    // setIncome(8000);
  }, []);

  React.useEffect(() => {
    if (budget.length > 0) {
      setShowAdd(false);
      let sum = 0;
      for (let i = 0; i < budget.length; i += 1) {
        sum += parseInt(budget[i].amount, 10);
      }
      setTotal(sum);
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
                          <div className="bb-input-title">Budget Name</div>
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
                        {i > 0 ? <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}>Delete</button> : null}
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

// return (
//   <div className="bb-container">
//     <div className="bb-mid-div">
//       <div className="bb-left">
//         <div className="bb-tabs">
//           {budgets ? budgets.map((budget: any, i: number) => (
//             <button key={budget.id} id={`bb-btn-${i}`} type="button" className="bb-tab" onClick={() => changeTabs(i)}>
//               Budget
//               {' '}
//               {i + 1}
//             </button>
//           )) : null}
//           <button type="button" className="bb-tab" id="bb-add-btn" onClick={changeToAdd}>Add +</button>
//         </div>
//         <div className="bb-budget-box">
//           {!showAdd ? (
//             <div className="bb-budget-top">
//               <>
//                 <div className="bb-budget-top-left">
//                   {activeBudget.map((row: any) => {
//                     if (row[0] === 'Income') {
//                       return (
//                         <div className="bb-income" key={row[1]}>
//                           Income:
//                           {' '}
//                           {row[1]}
//                           /mo
//                         </div>
//                       );
//                     }
//                     return null;
//                   })}
//                   <select onChange={(e: any) => sortExpenses(e)} className="bb-sort" name="sort" id="bb-sort-select">
//                     <option defaultValue="Sort">Sort</option>
//                     <option value="price-highest">Price Highest to Lowest</option>
//                     <option value="price-lowest">Price Lowest to Highest</option>
//                     <option value="alphabetical-AtoZ">Alphabetical A to Z</option>
//                     <option value="alphabetical-ZtoA">Alphabetical Z to A</option>
//                   </select>
//                 </div>
//                 {!editActive ? <button type="button" className="bb-budget-top-right" onClick={() => setEditActive(true)}>Edit</button> : <button type="button" className="bb-budget-top-right" onClick={() => setEditActive(false)}>Cancel</button>}
//               </>
//             </div>
//           ) : null}
//           <div className="bb-budget-middle">
//             {!showAdd ? (
//               <>
//                 {!editActive ? (
//                   <>
//                     {activeBudget.map((row: any, i: number) => {
//                       if (i > 0) {
//                         return (
//                           <div key={row[i]} className="bb-budget-middle-row">
//                             <ul>
//                               <li className="bb-budget-category">
//                                 {row[0]}
//                               </li>
//                             </ul>
//                             <div className="bb-budget-dollars">{row[1]}</div>
//                           </div>
//                         );
//                       }
//                       return null;
//                     })}
//                     <div className="bb-budget-bottom">
//                       <div className="bb-budget-total">
//                         <div className="bb-budget-total-title">Total:</div>
//                         <div className="bb-budget-total-amount>">
//                           $
//                           {activeTotal}
//                         </div>
//                       </div>
//                       <div className="bb-budget-difference">
//                         <div className="bb-budget-total-title">Remaining:</div>
//                         <div className="bb-budget-total-amount>">
//                           {activeBudget.map((row: any) => {
//                             if (row[0] === 'Income') {
//                               return (
//                                 <div className="bb-income" key={row[1]}>
//                                   $
//                                   {parseInt(row[1].slice(1), 10) - activeTotal}
//                                 </div>
//                               );
//                             }
//                             return null;
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="bb-edit-form">
//                     <form id="bb-form-edit" onSubmit={(e: any) => editActiveBudget(e)}>
//                       {activeBudget.map((row: any, i: number) => {
//                         if (i > 0) {
//                           return (
//                             // eslint-disable-next-line react/no-array-index-key
//                             <div className="bb-add-custom-row" key={row[0] + i}>
//                               <label htmlFor="bb-add-input-income" className="bb-add-input-group">
//                                 <div className="bb-input-title">Name</div>
//                                 <div className="bb-input-box">
//                                   <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" defaultValue={row[0]} />
//                                 </div>
//                               </label>
//                               <label htmlFor="bb-add-input-income" className="bb-add-input-group">
//                                 <div className="bb-input-title">Amount</div>
//                                 <div className="bb-input-box">
//                                   <span className="bb-prefix">$</span>
//                                   <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" defaultValue={row[1].slice(1)} />
//                                 </div>
//                               </label>
//                             </div>
//                           );
//                         }
//                         return null;
//                       })}
//                       <input type="submit" onClick={(e: any) => editActiveBudget(e)} className="bb-submit-custom-btn" value="Submit" />
//                     </form>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="bb-add-body">
//                 <h1 className="bb-add-title">Create a New Budget</h1>
//                 <form className="bb-add-form" id="myForm" onSubmit={(e: any) => addNewBudget(e)}>
//                   <label htmlFor="bb-add-input-income" className="bb-add-input-group">
//                     <div className="bb-input-title">Income (monthly)*</div>
//                     <div className="bb-input-box">
//                       <span className="bb-prefix">$</span>
//                       <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" />
//                     </div>
//                   </label>
//                   <div className="bb-add-custom">
//                     {numberOfExpenses.map((each: string, i: number) => (
//                       <div className="bb-add-custom-row" id={`custom-row-${i}`}>
//                         <label htmlFor="bb-add-input-custom" className="bb-add-input-group">
//                           <div className="bb-input-title">Name</div>
//                           <div className="bb-input-box">
//                             <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" placeholder="Category name..." />
//                           </div>
//                         </label>
//                         <label htmlFor="bb-add-input-custom" className="bb-add-input-group">
//                           <div className="bb-input-title">Amount</div>
//                           <div className="bb-input-box">
//                             <span className="bb-prefix">$</span>
//                             <input type="text" id="bb-add-input-custom" className="bb-input-field" autoComplete="off" />
//                           </div>
//                         </label>
//                         <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}>X</button>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="bb-buttons-div">
//                     <button type="button" className="bb-add-custom-btn" onClick={addExpense}>Add an expense +</button>
//                     <input type="submit" className="bb-submit-custom-btn" value="Submit" />
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="bb-right">
//         <div className="bb-chart">
//           <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Turkish_general_election%2C_2007_pie_chart.png" alt="pie chart" className="bb-pie-chart" />
//         </div>
//         <select className="bb-chart-type">
//           <option value="Pie Chart">Pie Chart</option>
//           <option value="Line Graph">Line Graph</option>
//           <option value="Bar Graph">Bar Graph</option>
//         </select>
//       </div>
//     </div>
//   </div>
// );

export default BudgetBreakdown;
