// import pokemonTypesData from "@data/pokemon/types";
import pokemonTypesData from "@data/pokemon/types";
import typesData from "@data/types";

export const getTypeNamesById = (id) => {
  const typeIds = pokemonTypesData
    .filter((type) => type.pokemon_id === id)
    .map((pokemon) => pokemon.type_id);

  return typeIds.map(
    (id) => typesData.find((type) => type.id === id).identifier,
  );
};

const get3DigitId = (id) => {
  if (id < 10) {
    return `00${id}`;
  }

  if (id < 100) {
    return `0${id}`;
  }
  return id;
};

const get4DigitId = (id) => {
  if (id < 10) {
    return `000${id}`;
  }

  if (id < 100) {
    return `00${id}`;
  }

  if (id < 1000) {
    return `0${id}`;
  }

  return id;
};
const BASE_ASSET_URL =
  "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master";
export const getSpriteUrlById = (id) => {
  // return `${BASE_ASSET_URL}/Images/Pokemon/pokemon_icon_${get3DigitId(id)}_00.png`;
  return `https://raw.githubusercontent.com/misspia/assets/master/pokemon/artwork/${id}.png`;
};

export const getModelUrlById = (id) => {
  return `${BASE_ASSET_URL}/3D%20Assets/Pokemon/pm${get4DigitId(id)}_00_Rig/pm${get4DigitId(id)}_00_Rig.fbx`;
};
