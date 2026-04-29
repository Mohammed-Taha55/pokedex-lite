// colors for each pokemon type - used on cards and in the modal
export const TYPE_COLORS = {
  normal:   { badge: "#A8A878" },
  fire:     { badge: "#F08030" },
  water:    { badge: "#6890F0" },
  electric: { badge: "#F8D030" },
  grass:    { badge: "#78C850" },
  ice:      { badge: "#98D8D8" },
  fighting: { badge: "#C03028" },
  poison:   { badge: "#A040A0" },
  ground:   { badge: "#E0C068" },
  flying:   { badge: "#A890F0" },
  psychic:  { badge: "#F85888" },
  bug:      { badge: "#A8B820" },
  rock:     { badge: "#B8A038" },
  ghost:    { badge: "#705898" },
  dragon:   { badge: "#7038F8" },
  dark:     { badge: "#705848" },
  steel:    { badge: "#B8B8D0" },
  fairy:    { badge: "#EE99AC" },
};

export const ALL_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

export const PAGE_SIZE = 20;
export const TOTAL_POKEMON = 1025;

// short display names for the base stats
export const STAT_LABELS = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "Sp.ATK",
  "special-defense": "Sp.DEF",
  speed: "SPD",
};
