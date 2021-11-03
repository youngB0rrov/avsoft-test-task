import React from "react";
import "../styles/pagination.css"

const Paginator = function ({itemsPerPage, totalItemsAmount, paginate, isFiltered, filterData, getItemsPerPage}) {
  const pageNumbers = []
  if(!isFiltered) {
    for (let i = 1; i <= Math.ceil(totalItemsAmount / itemsPerPage); i++) {
      pageNumbers.push(i)
    }
  } else {
    pageNumbers.length = 0
    for(let i = 1; i <= Math.ceil(filterData.length / itemsPerPage); i++) {
      pageNumbers.push(i)
    }
  }
  return (
      <div className="paginator">
        <p className="paginator-items">Items per page: </p>
        <select className="paginator-select"
                defaultValue="Items per page"
                onChange={(e) => {getItemsPerPage(e)}}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
        </select>
        <ul className="pagination">
          {
            pageNumbers.map((item, index) => (
                <li className="pagination-elem" key={index * 11}>
                  <p onClick={() => {paginate(item)}}>{item}</p>
                </li>
            ))
          }
        </ul>
      </div>
  )
}
export default Paginator;