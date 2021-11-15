import React from 'react';

interface Props {
  setNewBudget: Function;
  budget: any;
  deleteExpense: Function;
  editAddExpense: any;
}

const EditForm: React.FC<Props> = ({
  setNewBudget, budget, deleteExpense, editAddExpense,
}) => (
  <div>
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
              <input type="text" id="bb-add-input-income" className="bb-input-field" autoComplete="off" defaultValue={row.value} />
            </div>
          </label>
          {i > 0 ? <button type="button" className="bb-delete-custom-btn" onClick={(e: any) => deleteExpense(e, i)}><img src="https://cdn0.iconfinder.com/data/icons/octicons/1024/trashcan-512.png" alt="delete icon" className="bb-delete-icon" /></button> : null}
        </div>
      ))}
      <input type="submit" onClick={(e: any) => setNewBudget(e)} className="bb-submit-custom-btn" value="Update" />
      <button type="button" className="bb-add-custom-btn" onClick={editAddExpense}>Add +1 expense</button>
    </form>
  </div>
);

export default EditForm;
