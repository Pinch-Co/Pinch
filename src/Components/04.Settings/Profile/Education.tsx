import * as React from 'react';

function DropDown() {
  return (
    <div className="info-section-dropdown">
      <p className="info-section-question-title">Education Level</p>
      <select name="education-levels" id="education">
        <option value="select">Select Education Level</option>
        <option value="some-hs">Some high school or less</option>
        <option value="hs">High school graduate or equivalent (GED)</option>
        <option value="some-college">Some college, no degree</option>
        <option value="college-grad">College graduate</option>
        <option value="grad-school-nodeg">Graduate school, no degree</option>
        <option value="associates">Associate degree</option>
        <option value="masters">Masters degree</option>
        <option value="professional">Professional degree</option>
        <option value="docterate">Docterate</option>
      </select>
    </div>
  );
}

export default DropDown;
