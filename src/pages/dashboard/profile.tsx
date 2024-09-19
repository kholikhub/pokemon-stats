import FooterComponent from "../../Components/FooterComponent";
import StatsComponent from "../../Components/StatsComponent";
import Navigation from "../../Components/NavigationPrivate";
import useAuth from "@/Middleware/Auth";
import getPokemonList from '@/Utils/pokemonAPI';
import PokemonGrid from "@/Components/PokemonGrid";
import PokemonCard from "@/Components/PokemonCardComponent";

  export default function Profile() {
    // const pokemonList = await getPokemonList();

    useAuth();
    return (
        <>
          <Navigation/>
          <div>
            <StatsComponent />
          </div>
          {/* <div>
          <PokemonGrid pokemonList={pokemonList}/>
        </div> */}
          <div>
            <FooterComponent/>
          </div>
        </>

    );
  };