// POReport.jsx
import React, { useState, useEffect } from 'react';
import dataReport from '../data/dataReport.json';

const POReport = ({ onColumnChange }) => {
  const initialChecklist = dataReport.reduce((acc, item) => {
    acc[item.value] = false;
    return acc;
  }, {});

  const [checklist, setChecklist] = useState(initialChecklist);

  useEffect(() => {
    onColumnChange(checklist);
  }, [checklist]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updated = { ...checklist, [name]: checked };
    setChecklist(updated);
  };

  const selectAll = (event) => {
    const isChecked = event.target.checked;
    const updated = Object.fromEntries(
      Object.keys(checklist).map((key) => [key, isChecked])
    );
    setChecklist(updated);
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
      <label>
        <input type="checkbox" onChange={selectAll} style={{ marginRight: '5px', transform: 'scale(0.9)' }} />
        Select All
      </label>
    </div>
  );
};

export default POReport;

