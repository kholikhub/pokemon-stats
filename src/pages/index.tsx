import { useRouter } from 'next/navigation'
import NavigationGlobal from "../Components/NavigationGlobal"
import FooterComponent from "../Components/FooterComponent";
// import PokemonListComponent from "../Components/PokemonListComponent";


function Home() {


  const router = useRouter()
  return (
    <div  className="">
        <NavigationGlobal/>
        <div className=" my-60 border-2 mx-28 border-black">
          <div className="m-4 text-center mb-10">
          <h1 className=" my-4 text-2xl font-bold">WELCOME TO MY ASSIGNMENT</h1>
            <div>
              <h2 className=" my-2">Let`s try to create account</h2>
              <h2>login it and you can Search Pokemon Stats and Pokemon Evolution</h2>
            </div>
          </div>
          <div className=" flex justify-center">
            <button
              className=" text-white border-2 m-10 p-2 bg-rose-500 hover:bg-sky-400" 
              onClick={() => {
              router.push("/login/formLogin");
              }}
              >
              Login
              </button>
            <button 
              className=" text-white border-2 m-10 p-2 bg-rose-500 hover:bg-sky-400"
              onClick={() => {
              router.push("/login/register");
              }}
            >
              Register
            </button>
          </div>
        </div>

        <div>
            <FooterComponent/>
        </div>
    </div>
  );
};

export default Home;
