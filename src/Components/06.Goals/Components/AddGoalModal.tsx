import * as React from 'react';
import axios from 'axios';

interface openclose {
  getGoals: any,
  handleClose: any,
  show: boolean,
}

function AddGoalModal(props: openclose) {
  const { handleClose, show, getGoals } = props;
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [name, updateName] = React.useState<any>();
  const [goal, updateGoal] = React.useState<any>();
  const [current, updateCurrent] = React.useState<any>();
  const [description, updateDescription] = React.useState<any>();

  function submitGoal() {
    const goalSG = parseFloat(goal);
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

    updateName(null);
    updateGoal(null);
    updateCurrent(null);
    updateDescription(null);
    Array.from(document.querySelectorAll('input')).forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    });
    handleClose();
  }

  return (
    <div className="goal-modal">
      <div className={showHideClassName}>
        <section className="modal-main">
          <div> NEW GOAL UWU </div>
          <div> Goal Name: </div>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => { updateName(e.target.value); }}
          />
          <div> Goal Description: </div>
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => { updateDescription(e.target.value); }}
          />
          <div> Goal Amount: </div>
          <input
            type="text"
            placeholder="Amount"
            onChange={(e) => { updateGoal(e.target.value); }}
          />
          <div> Add to Goal: </div>
          <input
            type="text"
            placeholder="Add funds"
            onChange={(e) => { updateCurrent(e.target.value); }}
          />
          <button type="submit" onClick={() => submitGoal()}> submit </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    </div>
  );
}

export default AddGoalModal;
