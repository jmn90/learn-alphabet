import { NextResponse, NextRequest } from "next/server";

import { getPokemon, maxPokemon } from "@/pokemon";

export const dynamic = "auto";

export async function generateStaticParams() {
  const pokemons = Array.from({ length: maxPokemon }, (_, i) => `${i}`);
  // console.log(pokemons);
  return pokemons.map((pokemonId) => ({
    pokemonId,
  }));
}

export async function GET(
  req: NextRequest,
  { params }: { params: { pokemonId: string } }
) {
  // { params }: { params: { pokemonId: string } }
  // console.log("pokemonId");
  const { pokemonId } = params;
  // console.log(pokemonId);
  return NextResponse.json(await getPokemon(+(pokemonId || "")));
}
