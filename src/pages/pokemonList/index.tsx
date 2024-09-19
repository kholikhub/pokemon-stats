// Component SSR
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import React from "react";
import { Image } from "antd";
import Navigation from "../../Components/NavigationPrivate";

interface ResponsePokemon {
  results: Ipokemon[];
  next: string | null ;
  previus: string | null;
  img: string;
}

interface Ipokemon {
  name: string;
  url: string;
  img: string;
}



// Berjalan sisi client
function ListPokemon({results, next, previus, img} : ResponsePokemon) {
  console.log(results);
  console.log(next);
  // console.log(previus);
  console.log(img);

  return (
    <>
    <div>
    <Navigation/>
    </div>
    <div >
      <div >
          <h3 className='grid justify-center m-5 text-3xl font-semibold'>Pokemon List</h3>
        </div>
        <div>
          <div className=" flex justify-center m-2 text-2xl font-semibold">
            {results &&
            results.map((item) => {
              return (
                <>
                  <a 
                  className=" p-5 group rounded-lg m-1 text-center border border-transparant transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100" 
                  href={item.name}
                  >
                  {item.name}
                  </a>
                  {/* <Image 
                    src={item.img}
                    alt={"Pokemon:" + item.name}
                    width={300}
                    height={300}
                  /> */}
                </>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <a className="m-2" href={next?.toString()}>Next Page</a>
          <a className="m-2" href={previus?.toString()}>Prev Page</a>
        </div>

    </div>
    </>
  );
}

// getServerSideProps kan berjalan dari sisi server
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
  const data: ResponsePokemon = await response.json();
  const results = data.results;
  const next = data.next;
  const previus = data.previus;
  const img = data.img;

  return {
    props: {
      results,
      next,
      // previus,
      // img,

    },
  };
};

export default ListPokemon;
