import React from 'react';
import SelectDataView from './components/SelectDataView';
import POReport from './components/POReport';
import ApplyFilters from './components/ApplyFilters';
import TemplateConfig from './components/TemplateConfig';
import TableData from './components/TableData';

function App() {
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #e3efff, #ffffff)',
        minHeight: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        padding: '20px',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      {/* Top Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', flexShrink: 0 }}>
        {/* Left Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SelectDataView />
          <POReport />
        </div>

        {/* Middle */}
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
          <ApplyFilters />
        </div>

        {/* Right */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <TemplateConfig />
        </div>
      </div>

      {/* Table Section */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginTop: '10px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '10px'
      }}>
        <TableData />
      </div>
    </div>
  );
}

export default App;




