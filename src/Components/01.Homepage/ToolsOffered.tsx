import * as React from 'react';
import { motion } from 'framer-motion';

function ToolsOffered() {
  return (
    <div className="tool-outter-container">
      <div className="tools-offered">
        <div className="tool-section">
          <div className="tool-text-container">
            <div className="tool-title">Goals</div>
            <p className="tool-paragraph">Our Savings Goal tool makes saving easier by keeping track of the money set aside for those big purchases or rainy day funds. This tool has forecast capabilities which tells you how long before you reach your goal at a certain avings rate. You will also get text notification when the savings reach milestones.</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 5 }}
            className="tool-image-container"
          >
            <img src="/assets/images/noimageavailable.jpg" alt="Visual of the goals tracker" className="example-image" />
          </motion.div>
        </div>
        <div className="tool-section">
          <div className="tool-image-container">
            <img src="/assets/images/noimageavailable.jpg" alt="Visual of the goals tracker" className="example-image" />
          </div>
          <div className="tool-text-container">
            <div className="tool-title">Subscriptions Tracker</div>
            <p className="tool-paragraph">Keeping track of all our subscriptions can be a hasssle. This tools allows you to keep track of all your subscriptions based on your connected bank accounts. You can also see historic prices for that subscriptionv which helps you decide if you want to keep it overtime.</p>
          </div>
        </div>
        <div className="tool-section">
          <div className="tool-text-container">
            <div className="tool-title">Budget Breakdown</div>
            <p className="tool-paragraph">Part of healthy financing is knowing how to budget. Our budget breakdown tool will help you manage all your expenses and visually show you how they affect your wallet.</p>
          </div>
          <div className="tool-image-container">
            <img src="/assets/images/noimageavailable.jpg" alt="Visual of the goals tracker" className="example-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsOffered;
