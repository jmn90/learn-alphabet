import { Pokemon } from "./types";

function upperCaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function summarizePokemon(pokemon: any): Pokemon {
  return {
    name: upperCaseFirstLetter(pokemon.name),
    id: pokemon.id,
    image:
      pokemon.sprites?.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default,
    species: pokemon.species.name,
    types: pokemon.types
      .slice(0, 10)
      .map((s: any) => s.type.name)
      .join(", "),
    stats: pokemon.stats
      .slice(0, 10)
      .map((s: any) => `${s.stat.name}: ${s.base_stat}`)
      .join(", "),
    moves: pokemon.moves
      .slice(0, 10)
      .map((m: any) => m.move.name)
      .join(", "),
    cries: {
      latest: pokemon.cries?.latest,
    },
  };
}
export const maxPokemon = 1302;
export async function getFullPokemon(
  limit: number = maxPokemon,
  q?: string
): Promise<Pokemon[]> {
  // const resp = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=${
  //     q ? maxPokemon : limit || maxPokemon
  //   }&offset=0`
  // );
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302`);
  const json = await resp.json();

  let results: any[] = json.results;
  if (q) {
    results = results
      .filter(({ name }: { name: string }) => name.includes(q))
      .slice(0, +limit);
  }

  return await Promise.all(
    results.slice(0, +limit).map(async ({ url }: { url: string }) => {
      const resp = await fetch(url);
      const sum = summarizePokemon(await resp.json());
      // console.log(sum);
      return sum;
    })
  );
}

export async function getPokemonRange(id: string): Promise<Pokemon[]> {
  const pokemons: Pokemon[] = [];
  let startId = parseInt(id);

  for (let i = 0; i < 5; i++) {
    let currentId = startId + i;

    try {
      let resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);

      if (!resp.ok) {
        throw new Error(`Pokemon with ID ${currentId} not found`);
      }

      const pokemon = summarizePokemon(await resp.json());
      pokemons.push(pokemon);
    } catch (error) {
      // console.error(error.message);

      // If an error occurs, reset the starting ID to 1 and restart the loop
      startId = 0 - i;
      // i = -1; // Reset the loop to start from the new baseline
      // pokemons.length = 0; // Clear the collected Pokémon
    }
  }

  return pokemons;
}

export async function getPokemon(id: number): Promise<Pokemon> {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return summarizePokemon(await resp.json());
}
