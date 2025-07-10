import React from 'react';
import { FaEnvelope, FaRegCopy } from 'react-icons/fa';
import fields from '../data/templateFields.json';

const TemplateConfig = () => {
  return (
    <div style={{
      backgroundColor: '#e5effc',
      padding: '16px',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      minWidth: '260px',
      maxWidth: '300px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h4 style={{ margin: 0 }}>Select or Save as Template</h4>
        <FaRegCopy title="Save Template" style={{ cursor: 'pointer' }} />
      </div>

      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '12px', position: 'relative' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
            {field.label}
          </label>

          {field.type === 'dropdown' ? (
            <select style={inputStyle}>
              {field.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <>
              <input
                type={field.type}
                placeholder={field.placeholder}
                style={inputStyle}
              />
              {field.label === 'Email to' && (
                <FaEnvelope style={iconStyle} />
              )}
              {field.label === 'CC' && (
                <FaRegCopy style={iconStyle} />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
};

const iconStyle = {
  position: 'absolute',
  right: '10px',
  top: '36px',
  color: '#999'
};

export default TemplateConfig;
