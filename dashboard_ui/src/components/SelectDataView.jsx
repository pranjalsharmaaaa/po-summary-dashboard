import React, { useState } from 'react';
import reportOptions from '../data/dataViews.json'; // adjust path if needed

const SelectDataView = () => {
  const [selectedReport, setSelectedReport] = useState(reportOptions[0].value);

  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
  };

  return (
    <div style={{
      backgroundColor: '#d5e4f6',
      borderRadius: '10px',
      padding: '10px',
      width: '240px',
      fontSize: '13px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      lineHeight: '1.3'
    }}>
      <h4 style={{ margin: '0 0 10px', fontSize: '15px', color: '#1c2a39' }}>Select Report</h4>
      <select
        value={selectedReport}
        onChange={handleReportChange}
        style={{
          width: '100%',
          padding: '6px',
          borderRadius: '6px',
          border: '1px solid #5F85C4',
          fontSize: '13px'
        }}
      >
        {reportOptions.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectDataView;

