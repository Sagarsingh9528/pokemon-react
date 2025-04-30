import React, {useState, useEffect} from 'react'

function Filter({pokedex, isLoading, getFilter}) {
    const [selectedTypes, setSelectedTypes] = useState([]);

    const types = [...new Set(pokedex.flatMap(pokemon => pokemon.type))].sort();

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        const updated = checked
          ? [...selectedTypes, value]
          : selectedTypes.filter(type => type !== value);
    
        setSelectedTypes(updated);
    }

    const handleReset = () => {
        setSelectedTypes([]);
      };

      useEffect(() => {
        getFilter(selectedTypes);
      }, [selectedTypes, getFilter]);
    
      if (isLoading) return null;
    

  return (
    
        <ul className="filter">
          <h2>Types</h2>
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
          <button className="button mt-2" onClick={handleReset}>
            Reset types
          </button>
        </ul>
      
  )
}

export default Filter
