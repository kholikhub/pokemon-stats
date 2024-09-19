import { useState } from "react";
import Axios, { AxiosResponse, formToJSON } from "axios";
import { PokemonTypes } from "../Types/Pokemon";
import { redirect } from 'next/navigation'
import NavigationPrivate from "../Components/NavigationPrivate"
import { useRouter } from 'next/navigation'


const initialValues = {
  pokemonName: "",
};

export default function About () {

  const router = useRouter()

  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonChosen, setPokemonChosen] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<PokemonTypes>({
    id:"",
    name: "",
    species:"",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    spAttack: "",
    spDefence: "",
    speed: "",
    type: "",
  });

  async function searchPokemon (e:any) {
    e.preventDefault()
    try {
      if (pokemonName === "") {
        throw new Error("Please enter a Pokemon name");
      }
      const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`) as AxiosResponse<any, any>;
      setPokemon({

        id: response.data.id,
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defence: response.data.stats[2].base_stat,
        spAttack: response.data.stats[3].base_stat,
        spDefence: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
        type: response.data.types[0].type.name,
      });
      console.log(response.data.id);

      setPokemonChosen(true);
      if (response.status !== 200) {
        throw new Error("Failed to get Pokemon");
      }
    } catch (error) {
      alert("Pokemon not Found");
    }
  };

  const getIdPokemon = (url: string) => {
    return url.split("/")[6];
  };

  return (
    <>
      <div className=" bg-blue-400 w-full h-52 flex justify-center flex-col text-center">
        <div className="  font-bold flex flex-col items-center">
          <h1 className="mt-12 text-5xl text-white"> POKEMON STATS </h1>
          <input
            type="text"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
            className=" m-4 w-52 h-10 border rounded-xl p-3 text-xl text-black"
          />
          <button
            onClick={searchPokemon}
            className=" hover:bg-black border-sky-900 text-white bg-blue-700 w-40 h-10 mb-10  border rounded-xl text-s"
          >
            Search Pokemon
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center text-2xl font-bold mt-3">
        {!pokemonChosen ? (
          <h1>Please chose a Pokemon</h1>
        ) : (
          <div className=" p-10 text-center bg-blue-400 border-solid border-2 border-sky-500 rounded">
            <h1 className=" uppercase">{pokemon.name}</h1>
            <img src={pokemon.img} className=" h-40 w-40" />
            <div className="">

              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h4>HP: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defence: {pokemon.defence}</h4>
              <h4>Special Attack: {pokemon.spAttack}</h4>
              <h4>Special Defence: {pokemon.spDefence}</h4>
              <h4>Speed: {pokemon.speed}</h4>
            </div>
          </div>
        )}
      </div>      
    </>
  );
};
