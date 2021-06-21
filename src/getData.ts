const pokemonJS = require('pokemon.js');

export const getData = async (difference: boolean) => {
  const allPoke: [string] = await pokemonJS.getAll();
  const actualPoke = await (difference
    ? allPoke[Math.round(Math.random() * allPoke.length)]
    : (localStorage.getItem('pokemon') as string));
  const sprites: any = await pokemonJS.getSprites(actualPoke);
  const type: [{ logo: string; name: string }] = await pokemonJS.getType(
    actualPoke
  );
  return { actualPoke, sprites, type };
};
