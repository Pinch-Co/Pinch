import * as React from 'react';

function HouseSize() {
  return (
    <div className="info-section-dropdown">
      <p className="info-section-question-title">Residential Status</p>
      <div className="info-section-household">
        <select name="household-size-adults" id="adults">
          <option value="select">Select amount of adults</option>
          <option value="none">none</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6+">6+</option>
        </select>
        <select name="household-size-child" id="children">
          <option value="select">Select amount of children</option>
          <option value="none">none</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6+">6+</option>
        </select>
      </div>
    </div>
  );
}

export default HouseSize;
