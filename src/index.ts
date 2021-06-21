import { getData } from './getData';

interface Data {
  actualPoke: string;
  sprites: any;
  type: [
    {
      logo: string;
      name: string;
    }
  ];
}

// Language checker
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userLang: 'fr' | 'en' =
  (urlParams.get('lang') || navigator.language.slice(0, 2)) == 'fr'
    ? 'fr'
    : 'en';

// Date
const dateNow = Date.now() - (Date.now() % 86400000);
const lastDay = parseInt(localStorage.getItem('day') as string, 10) || 0;
const difference = dateNow - lastDay >= 86400000;
localStorage.setItem('day', `${difference ? dateNow : lastDay}`);

// HTML Element
const hello = document.querySelector('#hello') as HTMLHeadingElement;
const you = document.querySelector('#you') as HTMLParagraphElement;
const footer = document.querySelector('.footer') as HTMLParagraphElement;
const img = document.querySelector('img') as HTMLImageElement;
const icon = document.querySelector('.icon') as HTMLLinkElement;

const language = (data: Data) => {
  const language = {
    fr: {
      hello: `${
        8 <= new Date().getHours() && new Date().getHours() <= 18
          ? 'Bonjour,'
          : 'Bonsoir,'
      }`,
      you: `Vous êtes un.e ${data.actualPoke} aujourd'hui.`,
      footer: `Créée avec <i class="fas fa-heart"></i> par <a href="https://diamant.dev" target="_blank" rel="noopener noreferrer">Diamant</a>. - <a id="tweet" href="https://twitter.com/intent/tweet?text=Today, Je suis un.e ${data.actualPoke}, et vous? Regardez ici:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app" target="_blank">Partager sur twitter.</a>`,
    },
    en: {
      hello: `Hello,`,
      you: `You are ${
        data.actualPoke.startsWith('a') ||
        data.actualPoke.startsWith('e') ||
        data.actualPoke.startsWith('i') ||
        data.actualPoke.startsWith('o') ||
        data.actualPoke.startsWith('u')
          ? 'an'
          : 'a'
      } ${data.actualPoke} today.`,
      footer: `Made with <i class="fas fa-heart"></i> by <a href="https://diamant.dev" target="_blank" rel="noopener noreferrer">Diamant</a>. - <a id="tweet" href="https://twitter.com/intent/tweet?text=Today, I'm ${
        data.actualPoke.startsWith('a') ||
        data.actualPoke.startsWith('e') ||
        data.actualPoke.startsWith('i') ||
        data.actualPoke.startsWith('o') ||
        data.actualPoke.startsWith('u')
          ? 'an'
          : 'a'
      } ${
        data.actualPoke
      }, and you? Check here:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app" target="_blank">Share on twitter.</a>`,
    },
  };
  return language[userLang];
};

getData(difference).then((data) => {
  localStorage.setItem('pokemon', data.actualPoke);
  const languageText = language(data);

  img.alt = data.actualPoke;
  img.src = data.sprites.other['official-artwork'].front_default;
  icon.href = data.sprites.front_default;

  hello.innerHTML = languageText.hello;
  you.innerHTML = languageText.you;
  footer.innerHTML = languageText.footer;

  document.body.classList.add('ready', data.type[0].name);
});
