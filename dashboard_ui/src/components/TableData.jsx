import React from 'react';

const TableData = ({ columns, data }) => {
  if (!data || data.length === 0 || columns.length === 0) return <p>No data found.</p>;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        width: '100%',
        overflowX: 'auto',   // Enables horizontal scroll
      }}
    >
      <div style={{ minWidth: '1200px' }}> {/* Forces horizontal stretch */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr>
              {columns.map((head, idx) => (
                <th
                  key={idx}
                  style={{
                    border: '1px solid #ccc',
                    padding: '6px',
                    backgroundColor: '#f0f5fa',
                    textAlign: 'left',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    title={row[col] || ' '}
                    style={{
                      border: '1px solid #eee',
                      padding: '6px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '180px',
                    }}
                  >
                    {row[col] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableData;




