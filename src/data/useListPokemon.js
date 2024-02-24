import pokemonJSON from "@data/pokemon/pokemon.json";
import getTypeNamesById from "./getTypeNamesById";

import { useAssetLinks } from "@data/useAssetLinks";
import { useTypeNames } from "@data/useTypeNames";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 151;

const getStartId = (start) => {
  if (!start) return MIN_POKEMON_ID;
  if (start < MIN_POKEMON_ID) return MIN_POKEMON_ID;
  return start;
};

const getEndId = (end) => {
  if (!end) return MAX_POKEMON_ID;
  if (end > MAX_POKEMON_ID) return MAX_POKEMON_ID;
  return end;
};

export const useListPokemon = () => {
  const { getSpriteUrlById } = useAssetLinks();
  const { getTypeNamesById } = useTypeNames();

  const listPokemon = (start, end) => {
    const startId = getStartId(start);
    const endId = getEndId(end);
    return pokemonJSON.reduce((list, pokemon) => {
      if (pokemon.id < startId || pokemon.id > endId) {
        return list;
      }

      const node = {
        id: pokemon.id,
        name: pokemon.identifier,
        spriteUrl: getSpriteUrlById(pokemon.id),
        types: getTypeNamesById(pokemon.id),
      };
      list.push(node);
      return list;
    }, []);
  };

  return {
    listPokemon,
  };
};
