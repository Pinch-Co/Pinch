import * as React from 'react';
import { GrClose } from 'react-icons/gr';
// import axios from 'axios';

interface ListProps {
  handleDelete: any,
  name: string;
  goalAmount: number;
  currentAmount: number;
}

function GoalsList(props: ListProps) {
  const {
    name, goalAmount, currentAmount, handleDelete,
  } = props;

  const style = {
    backgroundColor: '',
    width: '',
  };
  const quickMath = Math.floor((currentAmount * 100) / goalAmount);
  style.width = `${quickMath}%`;

  if (quickMath >= 75) {
    style.backgroundColor = 'rgb(99, 172, 77)';
  } else if (quickMath <= 25) {
    style.backgroundColor = 'rgb(194, 63, 63)';
  } else {
    style.backgroundColor = 'rgb(226, 209, 57)';
  }

  return (
    <div className="a-goal">
      <div className="name-bar">
        {name}
        <div className="status-bar-back">
          <div className="status-bar" style={style}> </div>
        </div>
      </div>
      <div className="icons-edit-delete" role="button" tabIndex={0} onClick={handleDelete} onKeyPress={handleDelete}>
        <GrClose size={25} color="#696969" />
      </div>
    </div>
  );
}

export default GoalsList;
