/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoalChart from '../06.Goals/Components/GoalChart';
import AppContext from '../SharedComponents/06.Context/AppContext';
import exampleGoals from '../06.Goals/Components/exampleGoals';

// interface ChartProps {
//   goalAmount: number;
//   currentAmount: number;
// }

function GoalMini() {
  const [allGoals, setGoals] = React.useState<any>({});
  const { userObj } = React.useContext(AppContext);
  const history = useHistory();

  React.useEffect(() => {
    const headers = { 'Content-Type': 'application/json' };
    axios.post('/graphql',
      JSON.stringify({
        query: `query { getUserInfo(id: "${userObj.id}") {
          id
          goals {
            name
            currentAmount
            goalAmount
            description
          }
          }
        }`,
      }), { headers })
      .then((result) => {
        const x = result.data.data.getUserInfo.goals;
        if (x.length === null || x === undefined || x.length === 0) {
          setGoals(exampleGoals.getUserInfo.goals[0]);
        } else {
          setGoals(x[0]);
        }
      })
      .catch((error) => { throw (error); });
  }, [userObj.id]);

  const handleClickGoal = () => {
    history.push('/home/goals');
  };

  return (
    <div className="goalchart-mini-container">
      <p
        role="button"
        onClick={() => handleClickGoal()}
        onKeyPress={() => handleClickGoal()}
        className="click-message"
      >
        Click to view more
      </p>
      <div className="inner-container">
        <div className="overview-text">
          <h5 className="snapshot-overall-title">Goals</h5>
          <div className="snaps">
            <p className="snapshot-text">Description:</p>
            <p className="snapshot-text">{allGoals.description}</p>
          </div>
          <div className="snaps">
            <p className="snapshot-text">Goal Name:</p>
            <p className="snapshot-text">{allGoals.name}</p>
          </div>
          <div className="snaps">
            <p className="snapshot-text">Savings Goal:</p>
            <p className="snapshot-amount">
              $
              {allGoals.goalAmount}
            </p>
          </div>
          <div className="snaps">
            <p className="snapshot-text">Savings Goal:</p>
            <p className="snapshot-amount">
              $
              {allGoals.currentAmount}
            </p>
          </div>
        </div>
        <GoalChart {...allGoals} />
      </div>
    </div>
  );
}

export default GoalMini;
