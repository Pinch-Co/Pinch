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

}

const MainBudget: React.FC<Props> = ({
  editBudget, income, setNewIncome, sortExpenses, setEditBudget, total,
  setNewBudget, budget, deleteExpense, editAddExpense,
}) => (
  <>
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
  </>
);

export default MainBudget;
