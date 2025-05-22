import Link from "next/link";
import { Metadata } from "next";

interface PokemonDetailProps {
  params: { name: string };
}

export async function generateMetadata({
  params,
}: PokemonDetailProps): Promise<Metadata> {
  return {
    title: `Pokémon: ${params.name}`,
    description: `Details about Pokémon ${params.name}`,
  };
}

export default async function PokemonDetail({ params }: PokemonDetailProps) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  if (!res.ok) {
    return <p>Pokémon not found.</p>;
  }
  const pokemon = await res.json();

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <nav className="text-sm mb-4">
        <Link href="/pokemon" className="text-blue-600 hover:underline">
          Home
        </Link>{" "}
        &rarr; <span className="capitalize">{pokemon.name}</span>
      </nav>

      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mb-4"
      />

      <div>
        <p>
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <p>
          <strong>Types:</strong>{" "}
          {pokemon.types.map((t: any) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
        </p>
      </div>
    </main>
  );
}
