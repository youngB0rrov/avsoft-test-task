import React, {useState} from "react";
import ArrowDown from "./ArrowDown";
import ArrowUp from "./ArrowUp";
import "../styles/thead.css"


const Table = function ({data, sortData, getRowData, sortDirection}) {
  const headers = ['id', 'device', 'product', 'vendor', 'count', 'available', 'description']
  const [field, setField] = useState('')
  const DirectionArrow = () => {
    return (
        (!sortDirection) ? <ArrowDown/> : <ArrowUp/>
    )
  }
  const getFieldName = (field) => {
    sortData(field);
    setField(field);
  }
    return (
        <div className="main-table">
          <table className="table">
            <thead>
            <tr>
              {headers.map((item, index) => (
                  <th scope="col"
                      key={index * 10}
                      className="table-cells"
                      onClick={() => {getFieldName(item)}}>
                      {item} {field === item ? <DirectionArrow/> : null}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                      <tr key={index} onClick={() => {getRowData(item)}} className="table-rows">
                        {Object.keys(item).map((text, index) => (
                            <td key={index * 5} className="table-cells">
                              {(text === 'available') ? (item[text] === true ? 'Yes' : 'No') : item[text]}
                            </td>
                        ))}
                      </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}
export default Table