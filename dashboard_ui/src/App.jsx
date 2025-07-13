import React, { useState } from 'react';
import SelectDataView from './components/SelectDataView';
import POReport from './components/POReport';
import ApplyFilters from './components/ApplyFilters';
import TableData from './components/TableData';
import TemplateConfig from './components/TemplateConfig';
import dataTable from './data/dataTable.json';

const App = () => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filters, setFilters] = useState([{ column: '', condition: '', value: '' }]);
  const [filteredData, setFilteredData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleColumnSelection = (checklist) => {
    const selected = Object.keys(checklist).filter((key) => checklist[key]);
    setSelectedColumns(selected);
  };

  const handleGenerateReport = () => {
    let result = dataTable;

    filters.forEach(({ column, condition, value }) => {
      if (!column || !condition || value === '') return;

      result = result.filter((row) => {
        const rowValue = row[column] || '';
        const valStr = value.toString().toLowerCase();
        const rowStr = rowValue.toString().toLowerCase();

        if (condition === 'equals') return rowStr === valStr;
        if (condition === 'includes') return rowStr.includes(valStr);
        return true;
      });
    });

    setFilteredData(result);
    setShowTable(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Top Section Layout */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px'
        }}
      >
        {/* Left Section: Select Report + POReport */}
        <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
          <SelectDataView />
          <div style={{ marginTop: '15px' }}>
            <POReport onColumnChange={handleColumnSelection} />
          </div>
        </div>

        {/* Middle Section: Apply Filters */}
       {/* Middle + Right Section in one row */}
        <div style={{ display: 'flex', flex: 1, gap: '20px', minWidth: '750px' }}>

          <div style={{ flexGrow: 1 }}>
            <ApplyFilters
            filters={filters}
            setFilters={setFilters}
            onGenerateReport={handleGenerateReport}
            />
          </div>

  {/* TemplateConfig pushed to far right with fixed width */}
          <div style={{
            minWidth: '260px',
            maxWidth: '260px',
            flexShrink: 0
          }}>
          <TemplateConfig />
        </div>
      </div>

      </div>

      {/* Bottom Section: Table */}
      {showTable && (
        <div style={{ marginTop: '20px', overflowX: 'auto' }}>
          <TableData columns={selectedColumns} data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default App;






