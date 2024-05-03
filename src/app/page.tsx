import { getFullPokemon } from "@/pokemon";

import { SelectableGrid } from "@/app/components/SelectableGrid";

export default async function Home() {
  const pokemon = await getFullPokemon();
  // console.log(pokemon);
  return (
    <main className="mt-5">
      <SelectableGrid pokemon={pokemon} />
    </main>
  );
}
