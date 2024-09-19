import Link from "next/link";

interface PokemonCardProps {
    name: string;
}

export function PokemonCard ({ name } : PokemonCardProps) {
    return (
        <Link 
            href={name}
            className="group rounded-lg m-1 text-center border border-transparant transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100"
            key={name +"Card"}
        >
            <h2 className=" m-2 text-2xl font-semibold">
                {name}
            </h2>
        </Link>
    )
}

export default PokemonCard