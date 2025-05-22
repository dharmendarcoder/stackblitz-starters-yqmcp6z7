"use client";
import Link from "next/link";
import { Pokemon } from "@/lib/types";

export default function PokemonCard({ pokemon }: { pokemon: any }) {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="border p-4 rounded shadow hover:shadow-md flex flex-col items-center transition"
    >
      <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
      <p className="capitalize mt-2 font-medium">{pokemon.name}</p>
    </Link>
  );
}
