import { NextResponse, NextRequest } from "next/server";

import { getPokemon } from "@/pokemon";

export const dynamic = "auto";

export async function GET(
  req: NextRequest,
  { params }: { params: { pokemonId: string } }
) {
  return NextResponse.json(await getPokemon(+(params.pokemonId || "")));
}
