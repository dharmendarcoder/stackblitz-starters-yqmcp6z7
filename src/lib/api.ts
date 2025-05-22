import axios from "axios";
import { PokemonDetails } from "./types";
import { url } from "inspector";

// Base instance (optional for reuse)
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Get all Pokémon types
export async function getAllPokemonTypes(): Promise<string[]> {
  const { data } = await api.get("/type");
  return data.results.map((type: { name: string }) => type.name);
}

// Get all Pokémon (first 151 for Gen I)
export async function getAllPokemon(): Promise<PokemonDetails[]> {
  const { data } = await api.get("/pokemon?limit=151");

  const pokemonList: PokemonDetails[] = await Promise.all(
    data.results.map(async (p: { name: string; url: string }) => {
      const { data: detail } = await axios.get(p.url);
      return {
        name: detail.name,
        image: detail.sprites.front_default,
        types: detail.types.map((t: any) => t.type.name),
        url: detail.url,
      };
    })
  );

  return pokemonList;
}

// Get details of a single Pokémon by name
export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  const { data } = await api.get(`/pokemon/${name}`);

  return {
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((t: any) => t.type.name),
  };
}
