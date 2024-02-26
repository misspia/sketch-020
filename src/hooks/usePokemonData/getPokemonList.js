import pokemonData from "@data/pokemon/pokemon";

import {
  getSpriteUrlById,
  getTypeNamesById,
} from "@hooks/usePokemonData/helpers";

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

export const getPokemonList = () => {
  const startId = getStartId();
  const endId = getEndId();

  return pokemonData.reduce((list, pokemon) => {
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
