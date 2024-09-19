import React from 'react'
import PokemonGrid from "@/Components/PokemonGrid";
import getPokemonList from '@/Utils/pokemonAPI';

export default async function listPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
        const pokemonList = await getPokemonList();
    } catch (err) {
        console.log(err);
    }
  return (
    <>
        <div>
            <PokemonGrid pokemonList={getPokemonList}/> 
        </div>
    </>
    
  )
}
