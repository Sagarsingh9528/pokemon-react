import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import CardGrid from './components/pokedex/CardGrid';
import Search from './components/Search';
import Dropdown from './components/Dropdown';

const INTERVAL = 3;

function App() {
  const targetRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [tempPokedex, setTempPokedex] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const [types, setTypes] = useState([]);

 
  const options = useMemo(() => ({
    root: null,
    rootMargin: '0px',
    threshold: 0
  }), []);

  
  useEffect(() => {
    const callback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setOffset((prev) => prev + INTERVAL);
      }
    };

    const observer = new IntersectionObserver(callback, options);
    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [options]);

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${INTERVAL}&offset=${offset}`);
        const data = await res.json();
        const pokeNames = data.results.map(p => p.name);

        const pokemonData = await Promise.all(
          pokeNames.map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            return {
              name: data.name,
              id: data.id,
              image: data.sprites.front_default,
              backImage: data.sprites.back_default,
              weight: data.weight,
              height: data.height,
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defence: data.stats[2].base_stat,
              specialAttack: data.stats[3].base_stat,
              specialDefence: data.stats[4].base_stat,
              speed: data.stats[5].base_stat,
              type: data.types.map(t => t.type.name),
            };
          })
        );

        setTempPokedex(pokemonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [offset]);

  
  useEffect(() => {
    if (tempPokedex.length > 0) {
      setPokedex((prev) => [...prev, ...tempPokedex]);
    }
  }, [tempPokedex]);

 
  useEffect(() => {
    if (pokedex.length > 0) {
      const allTypes = pokedex
        .flatMap(pokemon => pokemon.type)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      setTypes(allTypes);
    }
  }, [pokedex]);

  
  return (
    <>
      <Search getQuery={setQuery} />
      <Dropdown
        label="Types"
        types={types}
        isLoading={isLoading}
        getFilter={setTypeFilter}
      />
      <div className="container">
        <CardGrid
          pokedex={pokedex}
          isLoading={isLoading}
          query={query}
          typeFilter={typeFilter}
        />
      </div>
      <div ref={targetRef} style={{ textAlign: 'center', margin: '2rem 0' }}>
        Loading...
      </div>
    </>
  );
}

export default App;
