import * as React from 'react';

function ToolsOffered() {
  return (
    <div className="tools-offered">
      <div className="goals">
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the goals tracker" className="example-image" />
        <span>Description of the goals tracker goes here</span>
      </div>
      <div className="sub-tracker">
        <span>Description of the subscriptions tracker goes here</span>
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the subscriptions tracker" className="example-image" />
      </div>
      <div className="budget">
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the budget tracker" className="example-image" />
        <span>Description of the budget tracker goes here</span>
      </div>
      <div className="credit">
        <span>Description of the credit payment goes here</span>
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the credit payment" className="example-image" />
      </div>
    </div>
  );
}

export default ToolsOffered;
