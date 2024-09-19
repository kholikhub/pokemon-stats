import { useCallback, useEffect, useState } from "react";
import FetchData from "../Utils/Fetch";
import Navigation from "../Components/NavigationPrivate";
import DetailComponent from "../Components/DetailComponent"
import FooterComponent from "../Components/FooterComponent";

const PokemonEvolution = () => {

  return (
    <>
      <Navigation/>
      <div>
       <h1 className=" flex justify-center my-10 text-2xl font-bold">Evolution Pokemon </h1>
        <div className=" flex justify-center">
          <div className=" cardEvo ">
              <DetailComponent />
            </div>
        </div>
      </div>
      <div>
            <FooterComponent/>
      </div>
    </>
  );
};

export default PokemonEvolution;
