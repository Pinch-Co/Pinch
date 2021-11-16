import React from 'react';

interface Props {
  setNewIncome: any;
  setNewBudget: any;
  numberOfExpenses: any;
  deleteExpense: any;
  addExpense: any;
}

const AddBudget: React.FC<Props> = ({
  setNewIncome, setNewBudget, numberOfExpenses, deleteExpense, addExpense,
}) => (
  <div className="bb-budget-div">
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
              <div className="bb-input-title" id="bb-input-amount">Amount</div>
              <div className="bb-input-box">
                <span className="bb-prefix">$</span>
                <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" />
              </div>
              {i > 0 ? <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}><img src="https://cdn0.iconfinder.com/data/icons/octicons/1024/trashcan-512.png" alt="delete icon" className="bb-delete-icon" /></button> : null}
            </label>
          </div>
        ))}
        <input type="submit" onClick={(e: any) => setNewBudget(e)} className="bb-submit-custom-btn" value="Submit" />
        <button type="button" className="bb-add-custom-btn" onClick={addExpense}>Add +1 expense</button>
      </form>
    </div>
  </div>
);

export default AddBudget;
