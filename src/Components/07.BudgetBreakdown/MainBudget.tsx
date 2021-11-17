import React from 'react';
import EditForm from './EditForm';

interface Props {
  editBudget: boolean;
  income: number;
  setNewIncome: Function;
  sortExpenses: Function;
  setEditBudget: Function;
  total: number;
  setNewBudget: Function;
  budget: any;
  deleteExpense: Function;
  editAddExpense: any;
  deleteBudget: Function;
}

const MainBudget: React.FC<Props> = ({
  editBudget, income, setNewIncome, sortExpenses, setEditBudget, total,
  setNewBudget, budget, deleteExpense, editAddExpense, deleteBudget,
}) => (
  <div className="bb-budget-div">
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
      <div className="bb-budget-top-right">
        {!editBudget
          ? (
            <button type="button" className="bb-budget-edit-btn" onClick={() => setEditBudget(true)}>Edit</button>
          )
          : (
            <>
              <button type="button" className="bb-budget-delete-btn" onClick={() => deleteBudget()}>Delete Budget</button>
              <button type="button" className="bb-budget-cancel-btn" onClick={() => setEditBudget(false)}>Cancel</button>
            </>
          )}
      </div>
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
                    {expense.value}
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
            <EditForm
              setNewBudget={setNewBudget}
              budget={budget}
              deleteExpense={deleteExpense}
              editAddExpense={editAddExpense}
            />
          </div>
        )}
    </div>
  </div>
);

export default MainBudget;
