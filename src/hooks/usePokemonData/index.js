import pokemonData from "@data/pokemon/pokemon";
import pokemonSpeciesData from "@data/pokemon/species";
import pokemonAbilitiesData from "@data/pokemon/abilities";
import pokemonStatsData from "@data/pokemon/stats";

import abilitiesData from "@data/abilities";
import statsData from "@data/stats";

import {
  getTypeNamesById,
  getModelUrlById,
} from "@hooks/usePokemonData/helpers";
import { getEvolutionByChainId } from "@hooks/usePokemonData/getEvolutionChain";
import { getPokemonList } from "@hooks/usePokemonData/getPokemonList";

const getEvolutionChainId = (pkId) => {
  const species = pokemonSpeciesData.find((pokemon) => pokemon.id === pkId);
  return species.evolution_chain_id;
};

const getAbiltyNamesById = (id) => {
  const abilityIds = pokemonAbilitiesData
    .filter((ability) => ability.pokemon_id === id)
    .map((pokemon) => pokemon.ability_id);

  return abilityIds.map(
    (id) => abilitiesData.find((ability) => ability.id === id).identifier,
  );
};

const getPokemonStatsById = (id) => {
  const pokemonStats = pokemonStatsData
    .filter((stat) => stat.pokemon_id === id)
    .map((pokemon) => ({
      statId: pokemon.stat_id,
      value: pokemon.base_stat,
    }));

  return pokemonStats.map(({ statId, value }) => {
    const key = statsData.find((stat) => stat.id === statId).identifier;
    return { key: key, value: value };
  });
};

export const usePokemonData = () => {
  const allPokemon = getPokemonList();

  console.debug("[pokemon list] ", allPokemon);

  const getPokemonById = (id) => {
    if (!id) return;
    const pokemon = pokemonData.find((pokemon) => pokemon.id === id);
    if (!pokemon) reData;

    return {
      id,
      chainId: getEvolutionChainId(id),
      weight: pokemon.weight,
      height: pokemon.height,
      baseExperience: pokemon.base_experience,
      abilities: getAbiltyNamesById(id),
      types: getTypeNamesById(id),
      stats: getPokemonStatsById(id),
      modelUrl: getModelUrlById(id),
    };
  };

  return {
    allPokemon,
    getPokemonById,
    getEvolutionByChainId,
  };
};
