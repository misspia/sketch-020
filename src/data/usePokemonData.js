import pokemonJSON from "@data/pokemon/pokemon.json";
import pokemonSpeciesJSON from "@data/pokemon/species.json";
import pokemonAbilitiesJSON from "@data/pokemon/abilities.json";
import pokemonStatsJSON from "@data/pokemon/stats.json";

import abilitiesJSON from "@data/abilities.json";
import statsJSON from "@data/stats.json";

import { useTypeNames } from "@data/useTypeNames";
import { usePokemonEvolution } from "@data/usePokemonEvolution";
import { useAssetLinks } from "./useAssetLinks";
import { useListPokemon } from "@data/useListPokemon";

const getEvolutionChainId = (pkId) => {
  const species = pokemonSpeciesJSON.find((pokemon) => pokemon.id === pkId);
  return species.evolution_chain_id;
};

const getAbiltyNamesById = (id) => {
  const abilityIds = pokemonAbilitiesJSON
    .filter((ability) => ability.pokemon_id === id)
    .map((pokemon) => pokemon.ability_id);

  return abilityIds.map(
    (id) => abilitiesJSON.find((ability) => ability.id === id).identifier,
  );
};

const getPokemonStatsById = (id) => {
  const pokemonStats = pokemonStatsJSON
    .filter((stat) => stat.pokemon_id === id)
    .map((pokemon) => ({
      statId: pokemon.stat_id,
      value: pokemon.base_stat,
    }));

  return pokemonStats.map(({ statId, value }) => {
    const key = statsJSON.find((stat) => stat.id === statId).identifier;
    return { key: key, value: value };
  });
};

export const usePokemonData = () => {
  const { getEvolutionByChainId } = usePokemonEvolution();
  const { getTypeNamesById } = useTypeNames();
  const { listPokemon } = useListPokemon();
  const { getModelUrlById } = useAssetLinks();

  const getPokemonById = (id) => {
    if (!id) return;
    const pokemon = pokemonJSON.find((pokemon) => pokemon.id === id);
    if (!pokemon) return;

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
    listPokemon,
    getPokemonById,
    getEvolutionByChainId,
  };
};
