export interface Result {
  name: string;
  url: string;
}

export interface AllPokes {
  count: number;
  results: Result[];
}

export interface Pokemon {
  abilities: Ability[];
  baseExperience: number;
  forms: Species[];
  gameIndices: any[];
  height: number;
  heldItems: HeldItem[];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: Move[];
  name: string;
  order: number;
  pastTypes: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  isHidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface HeldItem {
  item: Species;
  versionDetails: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: Species;
}

export interface Move {
  move: Species;
  versionGroupDetails: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  levelLearnedAt: number;
  moveLearnMethod: Species;
  versionGroup: Species;
}

export interface GenerationV {
  blackWhite: Sprites;
}

export interface GenerationIv {
  diamondPearl: Sprites;
  heartgoldSoulsilver: Sprites;
  platinum: Sprites;
}

export interface Versions {
  generationI: GenerationI;
  generationIi: GenerationIi;
  generationIii: GenerationIii;
  generationIv: GenerationIv;
  generationV: GenerationV;
  generationVi: { [key: string]: GenerationVi };
  generationVii: GenerationVii;
  generationViii: GenerationViii;
}

export interface Sprites {
  backDefault: null | string;
  backFemale: null;
  backShiny: null | string;
  backShinyFemale: null;
  front_default: null | string;
  frontFemale: null;
  frontShiny: null | string;
  frontShinyFemale: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  redBlue: RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  backDefault: null;
  backGray: null;
  frontDefault: null;
  frontGray: null;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Crystal;
  silver: Crystal;
}

export interface Crystal {
  backDefault: null;
  backShiny: null;
  frontDefault: null;
  frontShiny: null;
}

export interface GenerationIii {
  emerald: Emerald;
  fireredLeafgreen: Crystal;
  rubySapphire: Crystal;
}

export interface Emerald {
  frontDefault: null;
  frontShiny: null;
}

export interface GenerationVi {
  frontDefault: null | string;
  frontFemale: null;
  frontShiny: null | string;
  frontShinyFemale: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  ultraSunUltraMoon: GenerationVi;
}

export interface DreamWorld {
  frontDefault: null | string;
  frontFemale: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dreamWorld: DreamWorld;
  officialArtwork: OfficialArtwork;
}

export interface OfficialArtwork {
  frontDefault: string;
}

export interface Stat {
  baseStat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface Form {
  formName: string;
  formNames: Name[];
  formOrder: number;
  id: number;
  isBattleOnly: boolean;
  isDefault: boolean;
  isMega: boolean;
  name: string;
  names: Name[];
  order: number;
  pokemon: Pokemon;
  sprites: Sprites;
  types: Type[];
  versionGroup: Pokemon;
}

export interface Name {
  language: Color;
  name: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface Spaces {
  baseHappiness: number;
  captureRate: number;
  color: Color;
  eggGroups: Color[];
  evolutionChain: EvolutionChain;
  evolvesFromSpecies: Color;
  flavorTextEntries: FlavorTextEntry[];
  formDescriptions: any[];
  formsSwitchable: boolean;
  genderRate: number;
  genera: Genus[];
  generation: Color;
  growthRate: Color;
  habitat: Color;
  hasGenderDifferences: boolean;
  hatchCounter: number;
  id: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  name: string;
  names: Name[];
  order: number;
  palParkEncounters: PalParkEncounter[];
  pokedexNumbers: PokedexNumber[];
  shape: Color;
  varieties: Variety[];
  sprites: Sprites;
}

export interface Color {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavorText: string;
  language: Color;
  version: Color;
}

export interface Genus {
  genus: string;
  language: Color;
}

export interface PalParkEncounter {
  area: Color;
  baseScore: number;
  rate: number;
}

export interface PokedexNumber {
  entryNumber: number;
  pokedex: Color;
}

export interface Variety {
  isDefault: boolean;
  pokemon: Color;
}
