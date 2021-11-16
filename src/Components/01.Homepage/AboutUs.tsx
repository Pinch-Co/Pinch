import * as React from 'react';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-img">
        <img src="https://i.imgur.com/UakXwQz.png" alt="Visual of the front page" className="ab-img" />
      </div>
      <div className="description">
        <h3>What is Pinch?</h3>
        <p className="descipt-paragraph">
          Pinch is a personal finance site that helps you
          keep track of all your  financial needs.
          Our mission is to help you pinch all the
          pennies you can while also making the process
          as simple as possible. No need
          to hire an expensive financial
          consultant when you have Pinch.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
