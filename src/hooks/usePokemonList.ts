import { useEffect, useState } from "react";
import axios from "axios";

export interface PokemonWithImage {
  name: string;
  url: string;
  image: string | null;
}

export function usePokemonList(type: string, search: string) {
  const [pokemonList, setPokemonList] = useState<PokemonWithImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        let allPokemon: { name: string; url: string }[] = [];

        if (type) {
          // Fetch Pokémon by type
          const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
          allPokemon = res.data.pokemon.map((p: any) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
          }));
        } else {
          // Fetch first 151 Pokémon (Gen 1)
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=151`
          );
          allPokemon = res.data.results;
        }

        // Filter by search term
        const filtered = allPokemon.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

        // Fetch details for each Pokémon to get image
        const detailedList = await Promise.all(
          filtered.map(async (pokemon) => {
            try {
              const detailRes = await axios.get(pokemon.url);
              return {
                name: pokemon.name,
                url: pokemon.url,
                image: detailRes.data.sprites.front_default,
              };
            } catch {
              // fallback if detail fetch fails
              return { name: pokemon.name, url: pokemon.url, image: null };
            }
          })
        );

        setPokemonList(detailedList);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [type, search]);

  return { pokemonList, loading };
}
