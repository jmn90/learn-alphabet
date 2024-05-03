// "use client";
import { PokemonGrid } from "@/app/components/PokemonGrid";
import { PokemonInfo } from "@/app/components/PokemonInfo";
import { PokemonMenu } from "@/app/components/pokemonMenu";

import { getPokemon, maxPokemon } from "@/pokemon";
import { useState, useEffect } from "react";

export function generateStaticParams() {
  const pokemons = Array.from({ length: maxPokemon }, (_, i) => `${i + 1}`);
  // console.log("page", pokemons);
  return pokemons.map((pokemonId) => ({
    pokemonId,
  }));
}

export default async function PokemonDetailPage({
  params,
}: {
  params: { pokemonId: string };
}) {
  console.log("pokemonId");
  const { pokemonId } = params;
  // const { pokemon } = params;
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
      <div className="w-[200px] ml-auto fixed h-full overflow-y-auto right-4 top-0 pr-2">
        <PokemonMenu />
      </div>
    </main>
  );
}
