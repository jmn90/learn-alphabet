"use client";
import { useState } from "react";
import Link from "next/link";

import { Pokemon } from "@/types";

import { PokemonCard } from "./PokemonCard";
import { PokemonInfo } from "./PokemonInfo";

export function SelectableGrid({ pokemon }: { pokemon: Pokemon[] }) {
  const [selected, setSelected] = useState<Pokemon>();

  return (
    <div className="flex">
      <div className="w-full flex flex-wrap">
        {pokemon.map((p) => (
          <Link href={`/pokemon/${p.id}`} key={p.id}>
            <PokemonCard pokemon={p} />
          </Link>
        ))}
      </div>
      {selected && (
        <div className="w-1/2">
          <PokemonInfo id={selected.id} />
        </div>
      )}
    </div>
  );
}
