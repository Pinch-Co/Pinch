/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import AppContext from '../SharedComponents/06.Context/AppContext';

function BudgetMini() {
  const [inc, setIncome] = React.useState<number>();
  const [budge, setBudge] = React.useState<any>([]);
  const { userObj } = React.useContext(AppContext);
  const history = useHistory();

  React.useEffect(() => {
    // const headers = { 'Content-Type': 'application/json' };
    axios.post('/graphql', {
      query: `query {
        getUserInfo(id: ${JSON.stringify(userObj.id)}) {
          budget {
            income
            name
            value
          }
        }
      }`,
    }).then((res) => {
      const data = res.data.data.getUserInfo.budget;
      const vals: any = [];
      setIncome(data[0].income);
      data.forEach((item: any) => {
        if (vals.length < 4) {
          vals.push({ name: item.name, value: item.value });
        }
      });
      setBudge(vals);
    }).catch((err) => {
      console.log('GET budget', err);
    });
  }, [userObj.id]);

  const handleClickBudge = () => {
    history.push('/home/budget');
  };

  return (
    <div className="goalchart-mini-container">
      <p
        role="button"
        onClick={() => handleClickBudge()}
        onKeyPress={() => handleClickBudge()}
        className="click-message"
      >
        Click to view more
      </p>
      <div className="inner-budge-container">
        <div className="overview-text-budge">
          <h5 className="budge-overall-title">Budget</h5>
          <div className="snaps-budge">
            <p className="budge-text">Current Income:</p>
            <p className="budge-amount">
              $
              {inc?.toFixed(2)}
            </p>
          </div>
          <div className="snaps-budge">
            <p className="budge-text">Here are some of your expenses</p>
          </div>
          <div className="snaps-budge">
            <p className="budge-text">View your current budget</p>
          </div>
        </div>
        <div className="budget-list-snapshot">
          {budge.map((expense: any) => (
            <div className="budget-expense">
              <RiMoneyDollarCircleFill className="budget-money-icon" />
              <p className="budget-text">{expense.name}</p>
              <p className="budget-text">
                $
                {expense.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetMini;
