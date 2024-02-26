import evolutionData from "@data/evolution";
import evolutionTriggers from "@data/evolutionTriggers";
import items from "@data/items";
import gendersData from "@data/genders";
import locationsData from "@data/locations";
import movesData from "@data/moves";

const getEvolutionTrigger = (triggerId) => {
  if (!triggerId) return null;

  return evolutionTriggers.find((trigger) => trigger.id === triggerId)
    .identifier;
};

const getItem = (itemId) => {
  if (!itemId) return null;

  return items.find((item) => item.id === itemId).identifier;
};

const getGender = (genderId) => {
  if (!genderId) return null;

  return gendersData.find((gender) => gender.id === genderId).identifier;
};

const getLocation = (locationId) => {
  if (!locationId) return null;

  return locationsData.find((location) => location.id === locationId)
    .identifier;
};

const getMove = (moveId) => {
  if (!moveId) return null;

  return movesData.find((move) => move.id === moveId).identifier;
};

const getEvolutionNodes = (chainId) => {
  return pokemonSpeciesJSON.reduce((chainNodes, species) => {
    if (species.evolution_chain_id !== chainId) {
      return chainNodes;
    }

    let evolution = null;

    /**
     * Is not base form
     */
    if (species.evolves_from_species_id) {
      evolution = evolutionData.find(
        (evo) => evo.evolved_species_id === species.id,
      );
    }
    const node = createEvolutionNode(species, evolution);
    chainNodes.push(node);
    return chainNodes;
  }, []);
};

const defaultEvolutionObject = {
  id: null,
  evolved_species_id: null,
  evolution_trigger_id: null,
  trigger_item_id: null,
  minimum_level: null,
  gender_id: null,
  location_id: null,
  held_item_id: null,
  time_of_day: null,
  known_move_id: null,
  known_move_type_id: null,
  minimum_happiness: null,
  minimum_beauty: null,
  minimum_affection: null,
  relative_physical_stats: null,
  party_species_id: null,
  party_type_id: null,
  trade_species_id: null,
  needs_overworld_rain: null,
  turn_upside_down: null,
};

const createEvolutionNode = (species, evolutionObject) => {
  const evolution = evolutionObject || defaultEvolutionObject;
  return {
    id: species.id,
    name: species.identifier,
    artworkUrl: getAssets.artwork(species.id),
    types: getTypeNamesById(species.id),
    evolvesFromId: species.evolves_from_species_id,
    evolutionTrigger: getEvolutionTrigger(evolution.evolution_trigger_id),
    triggerItem: getItem(evolution.trigger_item_id),
    minimumLevel: evolution.minimum_level,
    gender: getGender(evolution.gender_id),
    location: getLocation(evolution.location_id),
    heldItem: getItem(evolution.held_item_id),
    timeOfDay: evolution.time_of_day,
    knownMove: getMove(evolution.known_move_id),
    minimumHappiness: evolution.minimum_happiness,
    minimumBeauty: evolution.minimum_beauty,
    minimumAffection: evolution.minimum_affection,
    relativePhysicalStats: evolution.relative_physical_stats,
    needsOverworldRain: evolution.needs_overworld_rain === 1,
    turnUpsideDown: evolution.turn_upside_down === 1,
  };
};

export const getEvolutionByChainId = (chainId) => ({
  chainId,
  chain: getEvolutionNodes(chainId),
});
