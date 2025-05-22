// app/page.tsx
import { getAllPokemonTypes, getAllPokemon } from "@/lib/api";
import SearchForm from "@/components/SearchForm";

export default async function Home() {
  const [pokemonList, types] = await Promise.all([
    getAllPokemon(), // SSR full list
    getAllPokemonTypes(),
  ]);

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <SearchForm initialPokemon={pokemonList} initialTypes={types} />
    </main>
  );
}
