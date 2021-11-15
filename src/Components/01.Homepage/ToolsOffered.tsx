import * as React from 'react';

function ToolsOffered() {
  return (
    <div className="tools-offered">
      <h2 className="tools">Tools we offer</h2>
      <div className="tool-slot">
        <div className="about-tool">
          <h2>Goals</h2>
          <p>Our Savings Goal tool makes saving easier by keeping track of the money</p>
          <p>set aside for those big purchases or rainy day funds. This tool has forecast</p>
          <p>capabilities which tells you how long before you reach your goal at a certain</p>
          <p>savings rate. You will also get text notification when the savings reach</p>
          <p>milestones.</p>
        </div>
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the goals tracker" className="example-image" />
      </div>
      <div className="tool-slot">
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the subscriptions tracker" className="example-image" />
        <div className="about-tool">
          <h2>Subscriptions Tracker</h2>
          <p>Keeping track of all our subscriptions can be a hasssle. This tools allows you to</p>
          <p>keep track of all your subscriptions by cost and bill due date based on your</p>
          <p>connected bank accounts. You can also see historic prices for that subscription</p>
          <p>which helps you decide if you want to keep it overtime.</p>
        </div>
      </div>
      <div className="tool-slot">
        <div className="about-tool">
          <h2>Budget Breakdown</h2>
          <p>some words</p>
          <p>will go here</p>
        </div>
        <img src="/assets/images/noimageavailable.jpg" alt="Visual of the budget tracker" className="example-image" />
      </div>
    </div>
  );
}

export default ToolsOffered;
