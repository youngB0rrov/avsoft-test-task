import React from "react";

const CurrentRowData = function ({row}) {
  return (
      <div className="rowData">
        <table className="table">
          <thead>
            <tr>
              {Object.keys(row).map((item, index) => (
                <th scope="col" key={index * 2}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(row).map((item, index) => (
                  <td key={index}>{item === 'available' ? ((row[item] === true ? 'Yes' : 'No')): row[item]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
  )
}

export default CurrentRowData;