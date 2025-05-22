'use client';

import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

export default function usePokemonList(type: string, searchTerm: string) {
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  // Debounced values
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Update debounced search term after delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(null);

      try {
        let pokemonList: Pokemon[] = [];

        if (type) {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
          const data = await res.json();
          pokemonList = data.pokemon.map((p: any) => p.pokemon);
        } else {
          const res = await fetch(
            'https://pokeapi.co/api/v2/pokemon?limit=150'
          );
          const data: PokemonListResponse = await res.json();
          pokemonList = data.results;
        }

        // Filter by debounced search term
        if (debouncedSearchTerm) {
          pokemonList = pokemonList.filter((p) =>
            p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        }

        setFilteredPokemon(pokemonList);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [type, debouncedSearchTerm]);

  return { filteredPokemon, loading, error };
}
