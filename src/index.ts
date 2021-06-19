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
    img.alt = rdmPoke;
    img.src = url.other['official-artwork'].front_default;
    const icon = document.querySelector('.icon') as HTMLLinkElement;
    icon.href = url.front_default;
    const a =
      rdmPoke.startsWith('a') ||
      rdmPoke.startsWith('e') ||
      rdmPoke.startsWith('i') ||
      rdmPoke.startsWith('o') ||
      rdmPoke.startsWith('u')
        ? 'an'
        : 'a';
    const shareURL = `https://twitter.com/intent/tweet?text=Today, I'm ${a} ${rdmPoke}, and you? Check here:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app`;
    const aP = document.querySelector('#a') as HTMLSpanElement;
    aP.innerText = a;
    const tweetBtn = document.querySelector('#tweet') as HTMLLinkElement;
    tweetBtn.href = shareURL;
    tweetBtn.removeAttribute('hidden');
  });
});
