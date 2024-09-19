export interface Pokemon {
  id: string;
  species: Species;
  name: string;
  sprites: Sprites;
  types: String;
  type: string;
  front_default:string;
  chain: Chain;
}

interface Sprites {
  front_default: string;
}

interface Species {
  url: string;
  name?: string;
}

export interface EvolutionChain {
  chain: Chain;
}

interface Chain {
  species: Species;
  evolves_to: Evolution[];
}

interface Evolution {
  species: Species;
  srites: Sprites;
  types: String;
}

export interface ResponseSpecies {
  evolution_chain: EvolutionChainSpecies;
}

interface EvolutionChainSpecies {
  url: string;
}

export interface PokemonTypes{
  id: string;
  name: string;
  species: string;
  img: string;
  hp: string;
  attack: string;
  defence: string;
  spAttack: string;
  spDefence: string;
  speed: string;
  type: string;
}

export interface IPokemonList{
  id: string;
  name: string;
  img: string;
}