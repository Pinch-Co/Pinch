/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  const backgroundClassName = `goal-modal-background ${showHideClassName}`;

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
      <div className={backgroundClassName} onClick={handleClose} />
      <div className={showHideClassName}>
        <section className="modal-main">
          <h3> NEW GOAL </h3>
          <form className="goal-input-group">
            <div className="goal-input-title"> Goal Name: </div>
            <div className="goal-input-box">
              <input
                className="goal-input-field"
                type="text"
                placeholder="Name"
                onChange={(e) => { updateName(e.target.value); }}
              />
            </div>
          </form>
          <form className="goal-input-group">
            <div className="goal-input-title"> Goal Description: </div>
            <div className="goal-input-box-desc">
              <input
                className="goal-input-field"
                type="text"
                placeholder="Description"
                onChange={(e) => { updateDescription(e.target.value); }}
              />
            </div>
          </form>
          <form className="goal-input-group">
            <div className="goal-input-title"> Goal Amount: </div>
            <div className="goal-input-box">
              <span className="bb-prefix">$</span>
              <input
                className="goal-input-field"
                type="text"
                placeholder="Amount"
                onChange={(e) => { updateGoal(e.target.value); }}
              />
            </div>
          </form>
          <form className="goal-input-group">
            <div className="goal-input-title"> Add to Goal: </div>
            <div className="goal-input-box">
              <span className="bb-prefix">$</span>
              <input
                className="goal-input-field"
                type="text"
                placeholder="Add funds"
                onChange={(e) => { updateCurrent(e.target.value); }}
              />
            </div>
          </form>
          <button className="goal-button" id="submit" type="submit" onClick={() => submitGoal()}> Submit </button>
          <button className="goal-button" type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    </div>
  );
}

export default AddGoalModal;
