import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import filterOptions from '../data/filterOptions.json';

const ApplyFilters = ({ filters, setFilters, onGenerateReport }) => {
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
      const confirmDel = window.confirm("Delete last filter?");
      if (confirmDel) setFilters(filters.slice(0, -1));
    }
  };

  const handleGenerateClick = () => {
    // Clean up values (e.g., convert dates to string)
    const formattedFilters = filters.map((filter) => ({
      ...filter,
      value: filter.column === 'PO ETD Date' && filter.value instanceof Date
        ? filter.value.toISOString().split('T')[0]
        : filter.value
    }));
    onGenerateReport(formattedFilters);
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

              <div>
                {isDate ? (
                  <DatePicker
                    selected={filter.value}
                    onChange={(date) => handleDateChange(index, date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
                    className="datepicker-input"
                    popperPlacement="bottom-start"
                  />
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

              <FaTimes onClick={() => clearValue(index)} style={{ cursor: 'pointer' }} title="Clear Value" />
            </div>
          );
        })}
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateClick}
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





