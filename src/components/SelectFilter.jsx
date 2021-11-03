import React from "react";

const Filter = function ({getSelect}) {
  return (
      <span>
        <span style={{marginRight: "20px"}}>Filter field:</span>
        <select defaultValue="id" onChange={(e) => {getSelect(e)}} style={{display: "inline-block"}}>
        <option hidden>Select filter field</option>
        <option value="id">id</option>
        <option value="device">device</option>
        <option value="product">product</option>
        <option value="vendor">vendor</option>
        <option value="count">count</option>
        <option value="available">available</option>
        <option value="description">description</option>
      </select>
      </span>
  )
}
export default Filter;