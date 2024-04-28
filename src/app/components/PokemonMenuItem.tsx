"use client";
import { PokemonCard } from "@/app/components/PokemonCard";
import { Pokemon } from "@/types";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { useRef, useEffect } from "react";

export const PokemonMenuItem = ({ pokemon }: { pokemon: Pokemon }) => {
  const params = useParams();
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If the condition is true, scroll to the element
    if (params.pokemonId === pokemon.id.toString() && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [params.pokemonId, pokemon.id]);

  return (
    <div
      ref={elementRef}
      className={classNames({
        "border-2 border-green-200": params.pokemonId === pokemon.id.toString(),
      })}
    >
      <PokemonCard pokemon={pokemon} />
    </div>
  );
};
