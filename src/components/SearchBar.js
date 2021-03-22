import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <strong>Search:</strong>
      <input type="text" onChange={(e) => props.handleSearch(e.target.value)}></input>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sort === "Alphabetically"} onChange={(e) => props.handleSort(e.target.value)}/>
        Alphabetically
        {/* checked attribute is a conditional to prevent more than one box to be checked at a time, aka this box will only be able to be checked if the conditional statement is true, matching the updated state; the onChange actually changes the state of the sort value */}
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sort === "Price"} onChange={(e) => props.handleSort(e.target.value)}/>
        Price
      </label>
      <label>
        <input type="radio" value="None" checked={props.sort === "None"} onChange={(e) => props.handleSort(e.target.value)}/>
        None
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => props.handleFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
