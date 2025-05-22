"use client";

import { useEffect, useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import PokemonCard from "./PokemonCard";
import { PokemonDetails } from "@/lib/types";

interface SearchFormProps {
  initialPokemon: PokemonDetails[];
  initialTypes: string[];
}

export default function SearchForm({
  initialPokemon,
  initialTypes,
}: SearchFormProps) {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [pokemonList] = useState<PokemonDetails[]>(initialPokemon);
  const [types] = useState<string[]>(initialTypes);

  // Client-side filtering based on type and search
  const filteredList = useMemo(() => {
    return pokemonList.filter((p) => {
      const matchesType = !type || p.types.includes(type);
      const matchesSearch =
        !debouncedSearch ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [pokemonList, type, debouncedSearch]);

  return (
    <div>
      <form className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1"
        />
      </form>

      {filteredList.length === 0 && (
        <p className="text-center text-gray-500">No Pokémon found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredList.map((p) => (
          <PokemonCard key={p.name} pokemon={p} />
        ))}
      </div>
    </div>
  );
}
