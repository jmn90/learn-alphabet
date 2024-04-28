// "use client";
import { PokemonGrid } from "@/app/components/PokemonGrid";
import { PokemonInfo } from "@/app/components/PokemonInfo";
import { PokemonMenu } from "@/app/components/pokemonMenu";

import { getPokemon } from "@/pokemon";
import { useState, useEffect } from "react";

export default async function PokemonDetailPage({
  params: { pokemonId },
}: {
  params: { pokemonId: string };
}) {
  // const [pokemon, setPokemon] = useState(null);

  // useEffect(() => {
  //   getPokemon(+pokemonId)
  //     .then((data) => {
  //       setPokemon(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [pokemonId]);

  const pokemon = await getPokemon(+pokemonId);
  return (
    <main>
      {pokemon && <PokemonInfo id={+pokemonId} pokemon={pokemon} />}
      <div className="w-[200px] ml-auto fixed h-full overflow-y-auto right-4 top-0">
        <PokemonMenu />
      </div>
    </main>
  );
}
