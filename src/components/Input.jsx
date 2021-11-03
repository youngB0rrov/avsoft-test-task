import React from "react";
import "../styles/input.css"


const Input = function ({filterSearch}) {

  return (
      <div className="search-input">
        <input type="text" placeholder="Filter search" id="filter-input" onChange={(e) => {filterSearch(e.target.value)}}/>
      </div>
  )
}

export default Input;