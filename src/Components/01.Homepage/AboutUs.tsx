import * as React from 'react';
import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-img">
        <img src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29tYW4lMjBvbiUyMGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="Visual of the front page" className="ab-img" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 5 }}
        className="description"
      >
        <h3 className="description-title">What is Pinch?</h3>
        <p className="descipt-paragraph">
          Pinch is a personal finance site that helps you
          keep track of all your  financial needs.
          Our mission is to help you pinch all the
          pennies you can while also making the process
          as simple as possible. No need
          to hire an expensive financial
          consultant when you have Pinch.
        </p>
      </motion.div>
    </div>
  );
}

export default AboutUs;
