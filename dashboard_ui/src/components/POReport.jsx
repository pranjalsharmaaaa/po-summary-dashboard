// src/components/POReport.js
import React, { useState } from 'react';
import dataReport from '../data/dataReport.json';

const POReport = () => {
  const initialChecklist = dataReport.reduce((acc, item) => {
    acc[item.value] = false;
    return acc;
  }, {});

  const [checklist, setChecklist] = useState(initialChecklist);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecklist({ ...checklist, [name]: checked });
  };

  const selectAll = (event) => {
    const isChecked = event.target.checked;
    const newChecklist = Object.keys(checklist).reduce((acc, key) => {
      acc[key] = isChecked;
      return acc;
    }, {});
    setChecklist(newChecklist);
  };

  return (
    <div style={{
      backgroundColor: '#4790F2',
      color: '#ffffff',
      borderRadius: '10px',
      padding: '10px',
      width: '240px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      fontSize: '13px',
      lineHeight: '1.3'
    }}>
      <h4 style={{ margin: '0 0 10px', fontSize: '15px' }}>PO Summary Report</h4>

      <div style={{
        backgroundColor: '#6CAAF8',
        borderRadius: '8px',
        padding: '8px',
        maxHeight: '120px',
        overflowY: 'auto'
      }}>
        {Object.keys(checklist).map((item, index) => (
          <div key={index} style={{ marginBottom: '2px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name={item}
                checked={checklist[item]}
                onChange={handleCheckboxChange}
                style={{ marginRight: '5px', transform: 'scale(0.9)' }}
              />
              {item}
            </label>
          </div>
        ))}
      </div>

      <hr style={{ margin: '8px 0', borderColor: '#fff' }} />

      <label style={{ fontWeight: 'normal' }}>
        <input type="checkbox" onChange={selectAll} style={{ marginRight: '5px', transform: 'scale(0.9)' }} />
        Select All
      </label>
    </div>
  );
};

export default POReport;
