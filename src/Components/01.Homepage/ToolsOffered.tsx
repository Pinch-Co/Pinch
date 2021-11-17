import * as React from 'react';
import { RiToolsLine } from 'react-icons/ri';

function ToolsOffered() {
  const [show1, setShow1] = React.useState<boolean>(true);
  const [show2, setShow2] = React.useState<boolean>(true);
  const [show3, setShow3] = React.useState<boolean>(true);

  const handleClick1 = () => {
    setShow1(!show1);
  };
  const handleClick2 = () => {
    setShow2(!show2);
  };
  const handleClick3 = () => {
    setShow3(!show3);
  };
  return (
    <div className="tool-outter-container">
      <div className="tool-header-div">
        <div className="tool-header-title">Tools we offer</div>
        <RiToolsLine className="tool-icon" />
      </div>
      <div className="tools-offered">
        {show1 ? (
          <div
            onClick={() => handleClick1()}
            onKeyDown={() => handleClick1()}
            tabIndex={0}
            role="button"
            className="tool-section"
          >
            <div className="tool-text-container">
              <div className="tool-title">Goals</div>
              <p className="tool-paragraph">Our Savings Goal tool makes saving easier by keeping track of the money set aside for those big purchases or rainy day funds. It also gives you a visual of how much closer you are to your goal.</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => handleClick1()}
            onKeyDown={() => handleClick1()}
            tabIndex={0}
            role="button"
            className="tool-section"
          >
            <div className="tool-text-container">
              <img className="tool-image" src="/assets/images/goals2.png" alt="screenshot of pinch goals tool" />
            </div>
          </div>
        )}
        {show2 ? (
          <div
            onClick={() => handleClick2()}
            onKeyDown={() => handleClick2()}
            tabIndex={0}
            role="button"
            className="tool-section"
          >
            <div className="tool-text-container">
              <div className="tool-title">Subscriptions Tracker</div>
              <p className="tool-paragraph">Keeping track of all our subscriptions can be a hasssle. This tools allows you to keep track of all your subscriptions based on your connected bank accounts.</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => handleClick2()}
            onKeyDown={() => handleClick2()}
            tabIndex={0}
            role="button"
            className="tool-section"
          >
            <div className="tool-text-container">
              <img className="tool-image" src="/assets/images/subscriptions2.png" alt="screenshot of pinch goals tool" />
            </div>
          </div>
        )}
        {show3 ? (
          <div
            onClick={() => handleClick3()}
            onKeyDown={() => handleClick3()}
            tabIndex={0}
            role="button"
            className="tool-section"
          >
            <div className="tool-text-container">
              <div className="tool-title">Budget Breakdown</div>
              <p className="tool-paragraph">Part of healthy financing is knowing how to budget. Our budget breakdown tool will help you manage all your expenses and visually show you how they affect your wallet.</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => handleClick3()}
            onKeyDown={() => handleClick3()}
            tabIndex={0}
            role="button"
            className="tool-section"
          >
            <div className="tool-text-container">
              <img className="tool-image" src="/assets/images/budgets2.png" alt="screenshot of pinch goals tool" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolsOffered;
