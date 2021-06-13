import React from "react";
import "../styles/Table.css";

const Table = ({ tableData }) => {
  return (
    <div className="table">
      {tableData &&
        tableData.map(({ country, cases }) => (
          <tr>
            <td>
              <strong>{country}</strong>
            </td>
            <td>{cases}</td>
          </tr>
        ))}
    </div>
  );
};

export default Table;
