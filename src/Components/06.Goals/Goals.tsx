/* eslint-disable no-alert */
// Import technologies
import * as React from 'react';
import axios from 'axios';
// Import icons
import { FaRegEdit } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { BsPiggyBank } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
// Import helper Components
import GoalsList from './Components/GoalsList';
import GoalChart from './Components/GoalChart';
import AddGoalModal from './Components/AddGoalModal';
import exampleGoals from './Components/exampleGoals';
import AppContext from '../SharedComponents/06.Context/AppContext';

function Goals() {
  // State
  const [currentGoals, updateGoals] = React.useState<any>([]);
  const [userPickedGoal, pickedGoal] = React.useState<any>({});
  const [show, updateShow] = React.useState<boolean>(false);
  const [addby, updateNumber] = React.useState<any>();
  // For Editing
  const [edit, updateEdit] = React.useState<boolean>(false);
  const [name, updateName] = React.useState<any>(userPickedGoal.name);
  const [goalie, updateGoal] = React.useState<any>(userPickedGoal.goalAmount);
  const [current, updateCurrent] = React.useState<any>(userPickedGoal.currentAmount);
  const [description, updateDescription] = React.useState<any>(userPickedGoal.description);

  const { userObj } = React.useContext(AppContext);

  function abrakadabra(data: any) {
    pickedGoal(data);
    updateName(data.name);
    updateGoal(data.goalAmount);
    updateCurrent(data.currentAmount);
    updateDescription(data.description);
  }

  function handleClose() {
    updateShow(false);
  }

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
        if (x === null || x === undefined || x.length === 0) {
          updateGoals(exampleGoals.getUserInfo.goals);
          pickedGoal(exampleGoals.getUserInfo.goals[0]);
        } else {
          updateGoals(result.data.data.getUserInfo.goals);
          pickedGoal(result.data.data.getUserInfo.goals[0]);
          updateName(result.data.data.getUserInfo.goals[0].name);
          updateGoal(result.data.data.getUserInfo.goals[0].goalAmount);
          updateCurrent(result.data.data.getUserInfo.goals[0].currentAmount);
          updateDescription(result.data.data.getUserInfo.goals[0].description);
        }
      })
      .catch((error) => { throw (error); });
  }, [userObj.id]);

  function getGoals() {
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
        if (result.data.data.getUserInfo.goals && result.data.data.getUserInfo.goals.length > 0) {
          console.log('Get goal', result.data.data.getUserInfo.goals);
          updateGoals(result.data.data.getUserInfo.goals);
          pickedGoal(result.data.data.getUserInfo.goals[0]);
        }
      })
      .catch((error) => { throw (error); });
  }

  function handleNewGoal() {
    const goalSG = parseFloat(goalie);
    const currentSG = parseFloat(current);
    const headers = { 'Content-Type': 'application/json' };

    axios.post('/graphql',
      JSON.stringify({
        query: `mutation {
        createGoal( id: "${userObj.id}"
        name: "${name}"
        currentAmount: ${currentSG}
        goalAmount: ${goalSG}
        description: "${description}") {
          currentAmount
        }
        }`,
      }), { headers })
      .then(() => { getGoals(); })
      .catch((error) => { throw (error); });
  }

  function handleDelete(goalName: string) {
    const headers = { 'Content-Type': 'application/json' };
    // eslint-disable-next-line no-restricted-globals
    axios.post('/graphql',
      JSON.stringify({
        query: `mutation { deleteGoal(
          id: "${userObj.id}"
          goalName: "${goalName}") {
            lastName
            }
          }`,
      }), { headers })
      .then(() => {
        getGoals();
      })
      .catch((error) => { throw (error); });
  }

  function handleUpdate() {
    const newAmount = parseFloat(addby) + userPickedGoal.currentAmount;
    const headers = { 'Content-Type': 'application/json' };
    axios.post('/graphql',
      JSON.stringify({
        query: `mutation{
          updateGoalAmount(
            id: "${userObj.id}"
            goalName: "${userPickedGoal.name}"
            original: ${userPickedGoal.currentAmount}
            update: ${newAmount}
            fieldOfUpdate: "currentAmount") {
              firstName
            }
          }`,
      }), { headers })
      .then(() => { getGoals(); })
      .catch((error) => { throw (error); });

    Array.from(document.querySelectorAll('input')).forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });
  }

  function handleFullUpdate() {
    handleDelete(userPickedGoal.name);
    handleNewGoal();

    updateEdit(false);
    updateName(null);
    updateGoal(null);
    updateCurrent(null);
    updateDescription(null);
  }

  return (
    <div className="goals-page">
      <div className="goals-container">
        <div className="goals-list">
          <div className="goals-list-inner">
            <div className="goals-main">
              <div className="goals-top">
                <div className="goals-div-title">Your Current Goals</div>
                <BsPiggyBank size={25} />
              </div>
              <div>
                {currentGoals.map((goal: any) => (
                  <div className="goals-list-container" key={goal.name} role="button" tabIndex={0} onClick={() => abrakadabra(goal)} onKeyPress={() => abrakadabra(goal)}>
                    <GoalsList handleDelete={() => { handleDelete(goal.name); }} {...goal} />
                  </div>
                ))}
              </div>
            </div>
            <div className="add-new">
              <div role="button" tabIndex={0} onClick={() => updateShow(true)} onKeyPress={() => updateShow(true)}>
                Add a new goal
                <IoIosAddCircleOutline className="goal-add-icon" size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="goals-analytics">
          <div className="current-goal-title">
            {edit
              ? (
                <form className="goal-input-group">
                  <div className="goal-input-box">
                    <input
                      className="goal-input-field"
                      type="text"
                      defaultValue={userPickedGoal.name}
                      onChange={(e) => { updateName(e.target.value); }}
                    />
                  </div>
                </form>
              ) : userPickedGoal.name}
            <div className="icon-style">
              <div
                role="button"
                tabIndex={0}
                onClick={() => updateEdit(!edit)}
                onKeyPress={() => updateEdit(!edit)}
              >
                <FaRegEdit size={25} color="#696969" />
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(userPickedGoal.name)}
                onKeyPress={() => handleDelete(userPickedGoal.name)}
              >
                <GrClose size={25} color="#696969" />
              </div>
            </div>
          </div>
          <div className="chart-space">
            <div className="forecast">
              <div className="forecast-inner">
                <form className="goal-input-group">
                  <div className="goal-input-title"> Description </div>
                  {edit
                    ? (
                      <div className="goal-input-box-desc">
                        <input
                          className="goal-input-field"
                          type="text"
                          defaultValue={userPickedGoal.description}
                          onChange={(e) => { updateDescription(e.target.value); }}
                        />
                      </div>
                    ) : userPickedGoal.description}
                </form>
                <form className="goal-input-group">
                  <div className="goal-input-title"> Current goal: </div>
                  {edit
                    ? (
                      <div className="goal-input-box">
                        <span className="bb-prefix">$</span>
                        <input
                          className="goal-input-field"
                          type="text"
                          defaultValue={userPickedGoal.goalAmount}
                          onChange={(e) => { updateGoal(e.target.value); }}
                        />
                      </div>
                    ) : `$${userPickedGoal.goalAmount}`}
                </form>
                <form className="goal-input-group">
                  <div className="goal-input-title"> Current amount saved: </div>
                  {edit
                    ? (
                      <div className="goal-input-box">
                        <span className="bb-prefix">$</span>
                        <input
                          className="goal-input-field"
                          type="text"
                          defaultValue={userPickedGoal.currentAmount}
                          onChange={(e) => { updateCurrent(e.target.value); }}
                        />
                      </div>
                    ) : `$${userPickedGoal.currentAmount}`}
                </form>
                {edit
                  ? (
                    <>
                      <button className="goal-button" id="submit" type="submit" onClick={handleFullUpdate}> Submit </button>
                      <button className="goal-button" type="submit" onClick={() => updateEdit(false)}> Cancel </button>
                    </>
                  )
                  : (
                    <div className="goal-input-group">
                      <div className="goal-input-title"> Amount to reach goal: </div>
                      <div>
                        $
                        {(userPickedGoal.goalAmount - userPickedGoal.currentAmount).toFixed(2)}
                      </div>
                      <form className="goal-input-group">
                        <div className="goal-top" />
                        <div className="goal-input-title">Add funds:</div>
                        <div className="goal-input-box">
                          <input
                            className="goal-input-field"
                            type="text"
                            placeholder="Add amount here"
                            onChange={(e) => { updateNumber(e.target.value); }}
                          />
                        </div>
                      </form>
                      <button className="goal-button" id="submit" type="submit" onClick={handleUpdate}>Submit</button>
                    </div>
                  )}
              </div>
            </div>
            <div className="goal-chart">
              <GoalChart {...userPickedGoal} />
            </div>
          </div>
          <AddGoalModal
            show={show}
            handleClose={() => { handleClose(); }}
            getGoals={() => { getGoals(); }}
          />
        </div>
      </div>
    </div>
  );
}

export default Goals;
