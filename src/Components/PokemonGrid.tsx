import React from 'react'
import PokemonCard from "./PokemonCardComponent"

interface PokemonGridProps {
  pokemonList: any
}
export default function PokemonGrid({pokemonList}: PokemonGridProps) {
    console.log(pokemonList);
    return (
    <>
      <div className='grid justify-center m-5 text-3xl font-semibold'>
        <h3>Pokemon List</h3>
      </div>
      <div className=" mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {pokemonList.map((pokemon : any) =>{
          console.log(pokemon.name);
          return (
            <PokemonCard name={pokemon.name}/>
          )
        })}
        <PokemonCard name={"pikachu"}/>

      </div> 
    </>
    
  )
}
