import React, { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ label, types, getFilter, isLoading }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    let updatedTypes = checked
      ? [...selectedTypes, value]
      : selectedTypes.filter((type) => type !== value);

    setSelectedTypes(updatedTypes);
    getFilter(updatedTypes);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    getFilter([]);
  };

  return (
    !isLoading && (
      <div className="dropdown-title">
        <label className="button capitalize">{label}</label>
        <div className="dropdown">
          <ul>
            {types.map((type) => (
              <li key={type} className="check">
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={handleCheckboxChange}
                />
                <label className="capitalize filter-types" htmlFor={type}>
                  {type}
                </label>
              </li>
            ))}
          </ul>
          <button className="button mt-2 ml-4 mb-4 p-2" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    )
  );
}

Dropdown.PropTypes = {
  label: PropTypes.string,
  types: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getFilter: PropTypes.func.isRequired,
};

export default Dropdown;
