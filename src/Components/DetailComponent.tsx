import { useParams } from "react-router-dom";
import { EvolutionChain, Pokemon, ResponseSpecies } from "../Types/Pokemon";
import { useCallback, useEffect, useState } from "react";
import FetchData from "../Utils/Fetch";

const PokemonDetail = () => {
  const param = useParams();

  const [data, setData] = useState<Pokemon>();
  const [evolution, setEvolution] = useState<EvolutionChain>();
  const [id, setId] = useState();

  const fetchPokemons = useCallback(async () => {
    const response: Pokemon = await FetchData(
      `https://pokeapi.co/api/v2/pokemon/${param.id}`
    );
    setData(response);
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const pokemonEvolution = async () => {
    const urlSpecies: string = data?.species.url ?? "";
    const response: ResponseSpecies = await FetchData(urlSpecies);


    const responseEvolution: EvolutionChain = await FetchData(
      response.evolution_chain.url
    );
    setEvolution(responseEvolution);
  };

  return (
    <div className=" text-center">
      <button
      className=""
        onClick={() => {
          pokemonEvolution();
        }}
      >
        Evolution
      </button>
      <div className="my-10">
        {evolution && (
          <h1>
            {data?.name} evolution to{" "}
            <i>{evolution.chain.evolves_to[0].species.name}</i>
          </h1>
        )}
      </div>
      <div>
        {data && (
            <>
              <img src={data?.sprites.front_default }/>
            </>
          )}
      </div>

    </div>
  );
};

export default PokemonDetail;
