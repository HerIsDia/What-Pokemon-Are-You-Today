const pokemonJS = require('pokemon.js');

const dateNow = Date.now() - (Date.now() % 86400000);

const lastDay = parseInt(localStorage.getItem('day') as string, 10) || 0;

const difference = dateNow - lastDay >= 86400000;

pokemonJS.getAll().then((pokemon: [string]) => {
  const rdmPoke = difference
    ? pokemon[Math.round(Math.random() * pokemon.length)]
    : (localStorage.getItem('pokemon') as string);
  const textToEdit = document.querySelector('#poke') as HTMLSpanElement;
  textToEdit.innerText = rdmPoke;
  localStorage.setItem('day', `${difference ? dateNow : lastDay}`);
  localStorage.setItem('pokemon', rdmPoke);
  pokemonJS.getSprites(rdmPoke).then((url: any) => {
    const img = document.querySelector('img') as HTMLImageElement;
    img.src = url.other['official-artwork'].front_default;
  });
});
