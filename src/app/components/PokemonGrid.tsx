import Link from "next/link";

import { PokemonDetail } from "@/routes";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "@/types";
import { getFullPokemon } from "@/pokemon";

export async function PokemonGrid({ pokemon }: { pokemon?: Pokemon[] }) {
  const pokemonFull = await getFullPokemon();

  return (
    <div className="flex flex-col">
      {pokemonFull.map((p) => (
        <PokemonDetail.Link pokemonId={p.id} key={p.id}>
          <PokemonCard pokemon={p} />
        </PokemonDetail.Link>
      ))}
    </div>
  );
}
