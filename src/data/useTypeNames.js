import pokemonTypesJSON from "@data/pokemon/types.json";
import typesJSON from "@/data/types.json";

export const useTypeNames = () => {
  const getTypeNamesById = (id) => {
    const typeIds = pokemonTypesJSON
      .filter((type) => type.pokemon_id === id)
      .map((pokemon) => pokemon.type_id);

    return typeIds.map(
      (id) => typesJSON.find((type) => type.id === id).identifier,
    );
  };

  return {
    getTypeNamesById,
  };
};
