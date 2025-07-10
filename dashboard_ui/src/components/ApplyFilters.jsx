// src/components/ApplyFilters.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import { MdCalendarToday, MdPadding } from 'react-icons/md';
import filterOptions from '../data/filterOptions.json';

const ApplyFilters = () => {
  const [filters, setFilters] = useState([
    { column: '', condition: '', value: '' },
    { column: '', condition: '', value: '' },
    { column: '', condition: '', value: '' },
    { column: '', condition: '', value: '' }
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...filters];
    updated[index][name] = value;
    setFilters(updated);
  };

  const handleDateChange = (index, date) => {
    const updated = [...filters];
    updated[index].value = date;
    setFilters(updated);
  };

  const clearValue = (index) => {
    const updated = [...filters];
    updated[index].value = '';
    setFilters(updated);
  };

  const addFilter = () => {
    setFilters([...filters, { column: '', condition: '', value: '' }]);
  };

  const deleteLastFilter = () => {
    if (filters.length > 0) {
      const confirmDel = window.confirm("Are you sure you want to delete the last filter column?");
      if (confirmDel) setFilters(filters.slice(0, -1));
    }
  };

  const handleGenerateReport = () => {
    try {
      filters.forEach((filter, i) => {
        if (!filter.column || !filter.condition) {
          throw new Error(`Row ${i + 1}: Column and condition are required.`);
        }
        if (['Vendor Name', 'Customer Name'].includes(filter.column)) {
          if (typeof filter.value !== 'string' || filter.value.trim() === '') {
            throw new Error(`${filter.column} must be a non-empty string.`);
          }
        }
        if (filter.column === 'PO ETD Date') {
          if (!(filter.value instanceof Date)) {
            throw new Error(`Invalid date format at row ${i + 1}`);
          }
        }
      });

      console.log('✅ Valid filters:', filters);
      alert('✅ Filters passed. Check console.');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{
      backgroundColor: '#d5e4f6',
      borderRadius: '15px',
      padding: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflowX: 'auto',
      maxWidth: '850px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h4 style={{ margin: 0 }}>Apply Filters</h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          <FaPlus title="Add Column" onClick={addFilter} style={{ cursor: 'pointer' }} />
          <FaTrash title="Delete Last Column" onClick={deleteLastFilter} style={{ cursor: 'pointer', color: 'red' }} />
        </div>
      </div>

      <div style={{
        maxHeight: '200px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingRight: '8px'
      }}>
        {filters.map((filter, index) => {
          const isDate = filter.column === 'PO ETD Date';

          return (
            <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {/* Column */}
              <select
                name="column"
                value={filter.column}
                onChange={(e) => handleChange(index, e)}
                style={{ width: '160px', padding: '6px', borderRadius: '6px', border: '1px solid #5F85C4' }}
              >
                <option value="">Column</option>
                {filterOptions.columns.map((col, i) => (
                  <option key={i} value={col}>{col}</option>
                ))}
              </select>

              {/* Condition */}
              <select
                name="condition"
                value={filter.condition}
                onChange={(e) => handleChange(index, e)}
                style={{ width: '100px', padding: '6px', borderRadius: '6px', border: '1px solid #5F85C4' }}
              >
                <option value="">Cond</option>
                {filterOptions.conditions.map((cond, i) => (
                  <option key={i} value={cond}>{cond}</option>
                ))}
              </select>

              {/* Value Field */}
              <div style={{ position: 'relative' }}>
                {isDate ? (
                  <>
                    <DatePicker
                      selected={filter.value}
                      onChange={(date) => handleDateChange(index, date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Date"
                      className="form-control"
                      style={{ width: '160px', padding: '6px', borderRadius: '6px', border: '1px solid #5F85C4' }}
                    />
                    

                    
                  </>
                ) : (
                  <input
                    type="text"
                    name="value"
                    value={filter.value}
                    maxLength={30}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Value"
                    style={{ width: '160px', padding: '6px', borderRadius: '6px', border: '1px solid #5F85C4' }}
                  />
                )}
              </div>

              {/* Clear icon */}
              <FaTimes onClick={() => clearValue(index)} style={{ cursor: 'pointer' }} title="Clear Value" />
            </div>
          );
        })}
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateReport}
        style={{
          backgroundColor: '#4790F2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '10px',
          width: '100%',
          marginTop: '16px',
          fontWeight: 'bold'
        }}
      >
        Generate REPORT
      </button>
    </div>
  );
};

export default ApplyFilters;



