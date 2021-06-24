var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

import { AllPokes, Pokemon, Form, Spaces } from './Interfaces';

export const getData = async (
  difference: boolean,
  pokemonID: number,
  online: boolean
) => {
  if (online) {
    const allPoke: AllPokes = await P.getPokemonsList();
    const ID = difference
      ? Math.round(Math.random() * allPoke.count)
      : pokemonID;
    const Poke: Pokemon = await P.getPokemonByName(allPoke.results[ID].name);

    try {
      const PokeSpaces: Spaces = await P.getPokemonSpeciesByName(
        Poke.forms[0].name
      );
      return {
        ID,
        Names: PokeSpaces.names,
        Name: PokeSpaces.name,
        ImgID: Poke.id,
        Type: Poke.types[0].type.name,
      };
    } catch (error) {
      const PokeForm: Form = await P.getPokemonFormByName(Poke.forms[0].name);
      return {
        ID,
        Names: PokeForm.names,
        Name: PokeForm.name,
        ImgID: Poke.id,
        Type: Poke.types[0].type.name,
      };
    }
  } else {
    return JSON.parse(localStorage.getItem('dataCache') as string);
  }
};
