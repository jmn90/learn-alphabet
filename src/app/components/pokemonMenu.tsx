import { PokemonDetail } from "@/routes";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "@/types";
import { getFullPokemon, getPokemonRange } from "@/pokemon";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { PokemonMenuItem } from "@/app/components/PokemonMenuItem";

export async function PokemonMenu({ pokemonId }: { pokemonId: string }) {
  const pokemonFull = await getPokemonRange(pokemonId);

  return (
    <div className="flex flex-col">
      {pokemonFull.map((p) => (
        <PokemonMenuItem pokemon={p} key={p.id} />
      ))}
    </div>
  );
}
