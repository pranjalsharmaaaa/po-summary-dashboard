// src/components/TableData.jsx
import React, { useMemo, useState } from 'react';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect } from 'react-table';
import dataTable from '../data/dataTable.json';
import './TableData.css';

const TableData = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const data = useMemo(() => dataTable, []);
  const columns = useMemo(() =>
    Object.keys(dataTable[0]).map((key) => ({
      Header: key,
      accessor: key,
    })),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useFlexLayout,
    useResizeColumns,
    useRowSelect
  );

  return (
    <div className="tableWrapper">
      <table {...getTableProps()} className="customTable">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div className="headerCell" title={column.render('Header')}>
                    {column.render('Header')}
                  </div>
                  {column.canResize && <div {...column.getResizerProps()} className="resizer" />}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`tableRow ${rowIndex % 2 === 0 ? 'even' : 'odd'} ${selectedRowIndex === rowIndex ? 'selected' : ''}`}
                onClick={() => setSelectedRowIndex(rowIndex)}
              >
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} title={cell.value}>
                    <div className="cellContent">{cell.render('Cell')}</div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
