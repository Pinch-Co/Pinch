import * as React from 'react';

function Income() {
  return (
    <div className="info-section-dropdown">
      <p className="info-section-question-title">Income</p>
      <select name="income-levels" id="income">
        <option value="select">Select Income</option>
        <option value="20-40">$20,000 - $44,999</option>
        <option value="50-74">$50,000 - $74,999</option>
        <option value="75-99">$75,000 - $99,999</option>
        <option value="110-149">$110,000 - $149,000</option>
        <option value="150+">$150,000 + </option>
      </select>
    </div>
  );
}

export default Income;
