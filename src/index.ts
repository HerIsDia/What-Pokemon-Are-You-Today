import * as Pokemon from 'pokemon';

const dateNow = Date.now() - (Date.now() % 86400000);

const lastDay = parseInt(localStorage.getItem('day') as string, 10) || 0;

const difference = dateNow - lastDay >= 86400000;

const rdmPoke = difference
  ? Pokemon.random()
  : (localStorage.getItem('pokemon') as string);

const textToEdit = document.querySelector('#poke') as HTMLSpanElement;

textToEdit.innerText = rdmPoke;

localStorage.setItem('day', `${difference ? dateNow : lastDay}`);
localStorage.setItem('pokemon', rdmPoke);

const img = document.querySelector('img') as HTMLImageElement;
img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Pokemon.getId(
  rdmPoke
)}.png`;
