import React from 'react'
import Card from './Card'

function CardGrid({pokedex, isLoading, query, typeFilter}) {
  const searchedPokemon = pokedex.filter((pokemon)=>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  )

  const filteredPokemon = pokedex.filter((pokemon) =>
    pokemon.type.some((type) => typeFilter.includes(type))
  );

  const sortedPokemon =
  typeFilter.length === 0
    ? searchedPokemon
    : searchedPokemon.filter((pokemon) =>
        filteredPokemon.includes(pokemon)
      );

if (isLoading) return ;


  return (
    <section className='container'>
    {sortedPokemon.map((pokemon) => (
      <div key={pokemon.id} className='cards'>
        <Card pokemon={pokemon} />
      </div>
    ))}
  </section>
);
  
}

export default CardGrid
