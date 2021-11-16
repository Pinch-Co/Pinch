import * as React from 'react';
import AboutUs from './AboutUs';
import SignUp from './SignUp';
import ToolsOffered from './ToolsOffered';

function Home() {
  return (
    <div className="nl-home-container">
      <div className="nl-home-inner-container">
        <AboutUs />
        <ToolsOffered />
        {/* <SignUp /> */}
      </div>
    </div>
  );
}

export default Home;
