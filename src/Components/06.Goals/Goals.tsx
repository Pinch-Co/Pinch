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
        query: `query { getUserInfo(id: "${sessionStorage.id}") {
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
  }, []);

  function getGoals() {
    const headers = { 'Content-Type': 'application/json' };
    axios.post('/graphql',
      JSON.stringify({
        query: `query { getUserInfo(id: "${sessionStorage.id}") {
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
        if (result.data.data.getUserInfo.goals.length > 0) {
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
        createGoal( id: "${sessionStorage.id}"
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
    axios.post('/graphql',
      JSON.stringify({
        query: `mutation { deleteGoal(
        id: "${sessionStorage.id}"
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
            id: "${sessionStorage.id}"
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
    handleNewGoal();
    handleDelete(userPickedGoal.name);

    updateEdit(false);
    updateName(null);
    updateGoal(null);
    updateCurrent(null);
    updateDescription(null);
  }

  return (
    <div className="goals-page">
      <div className="goals-list">
        <div className="current-goals">
          <div>
            YOUR CURRENT GOALS
          </div>
          <BsPiggyBank size={25} />
        </div>
        <div>
          {currentGoals.map((goal: any) => (
            <div key={goal.name} role="button" tabIndex={0} onClick={() => abrakadabra(goal)} onKeyPress={() => abrakadabra(goal)}>
              <GoalsList handleDelete={() => { handleDelete(goal.name); }} {...goal} />
            </div>
          ))}
        </div>
        <div className="add-new">
          <div>
            Add a new Goal
          </div>
          <div role="button" tabIndex={0} onClick={() => updateShow(true)} onKeyPress={() => updateShow(true)}>
            <IoIosAddCircleOutline size={25} />
          </div>
        </div>
      </div>
      <div className="goals-analytics">
        <div className="current-goal-title">
          <div>
            {edit
              ? (
                <input
                  type="text"
                  defaultValue={userPickedGoal.name}
                  onChange={(e) => { updateName(e.target.value); }}
                />
              ) : userPickedGoal.name}
          </div>
          <div className="icon-style">
            <div role="button" tabIndex={0} onClick={() => updateEdit(true)} onKeyPress={() => updateEdit(true)}>
              <FaRegEdit size={25} color="#696969" />
            </div>
            <div role="button" tabIndex={0} onClick={() => handleDelete(userPickedGoal.name)} onKeyPress={() => handleDelete(userPickedGoal.name)}>
              <GrClose size={25} color="#696969" />
            </div>
          </div>
        </div>
        <div className="chart-space">
          <div className="description">
            <GoalChart {...userPickedGoal} />
          </div>
          <div className="forecast">
            <div> Description </div>
            <div>
              {edit
                ? (
                  <input
                    type="text"
                    defaultValue={userPickedGoal.description}
                    onChange={(e) => { updateDescription(e.target.value); }}
                  />
                ) : userPickedGoal.description}
            </div>
            <div> Current Goal: </div>
            <div>
              {edit
                ? (
                  <input
                    type="text"
                    defaultValue={userPickedGoal.goalAmount}
                    onChange={(e) => { updateGoal(e.target.value); }}
                  />
                ) : userPickedGoal.goalAmount}
            </div>
            <div> Current Amount Saved: </div>
            <div>
              {edit
                ? (
                  <input
                    type="text"
                    defaultValue={userPickedGoal.currentAmount}
                    onChange={(e) => { updateCurrent(e.target.value); }}
                  />
                ) : userPickedGoal.currentAmount}
            </div>
            {edit
              ? <button type="submit" onClick={() => { handleFullUpdate(); }}> submit </button> : (
                <div>
                  <div> Amout to reach goal: </div>
                  <div>
                    {(userPickedGoal.goalAmount - userPickedGoal.currentAmount).toFixed(2)}
                  </div>
                  <div>
                    <input
                      type="text"
                      defaultValue="Add amount here"
                      onChange={(e) => { updateNumber(e.target.value); }}
                    />
                  </div>
                  <button type="submit" onClick={() => { handleUpdate(); }}> submit </button>
                </div>
              )}
          </div>
        </div>
      </div>
      <AddGoalModal
        show={show}
        handleClose={() => { handleClose(); }}
        getGoals={() => { getGoals(); }}
      />
    </div>
  );
}

export default Goals;
