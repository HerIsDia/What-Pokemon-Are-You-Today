import { getData } from './getData';
import { historyAdd, historyShowed } from './History';
import { Color } from './Interfaces';

export interface DataLS {
  pokemonID: number;
  date: number;
  level: number;
  version: string;
}

const version = '1.3.1';

interface Name {
  language: Color;
  name: string;
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
const dataGet: DataLS = JSON.parse(localStorage.getItem('data') as string) || {
  date: 0,
};
const lastDay = dataGet.date;
const difference = dateNow - lastDay >= 86400000 || dataGet.version != version;
const online = navigator.onLine;

// HTML Element
const hello = document.querySelector('#hello') as HTMLHeadingElement;
const you = document.querySelector('#you') as HTMLParagraphElement;
const footer = document.querySelector('.footer') as HTMLParagraphElement;
const img = document.querySelector('img') as HTMLImageElement;
const icon = document.querySelector('.icon') as HTMLLinkElement;
const day = document.querySelector('.day') as HTMLDivElement;

const language = (Names: Name[], level: number, Name: string) => {
  const matchName =
    Names.filter((lang) => lang.language.name == userLang)[0] != undefined
      ? Names.filter((lang) => lang.language.name == userLang)[0].name
      : Names[0] != undefined
      ? Names[0].name
      : Name;
  // Detect if matchName start with a vowel
  const matchNameVowel =
    matchName.slice(0, 1).toLowerCase() == 'a' ||
    matchName.slice(0, 1).toLowerCase() == 'e' ||
    matchName.slice(0, 1).toLowerCase() == 'i' ||
    matchName.slice(0, 1).toLowerCase() == 'o' ||
    matchName.slice(0, 1).toLowerCase() == 'u';
  const language = {
    fr: {
      hello: `${
        8 <= new Date().getHours() && new Date().getHours() <= 18
          ? 'Bonjour,'
          : 'Bonsoir,'
      }`,
      you: `Vous êtes un.e ${matchName} niveau ${level} aujourd'hui.`,
      footer: `Créée avec <i class="fas fa-heart"></i> par <a href="https://diamant.dev" target="_blank" rel="noopener noreferrer">Diamant</a>. - <a id="tweet" href="https://twitter.com/intent/tweet?text=Today, Je suis un.e ${matchName} niveau ${level}, et vous? Regardez ici:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app" target="_blank">Partager sur twitter.</a>`,
      Offfooter: `Créée avec <i class="fas fa-heart"></i> par Diamant. - Version hors ligne.`,
    },
    en: {
      hello: `Hello,`,
      you: `You are I'm ${
        matchNameVowel ? 'an' : 'a'
      } ${matchName} lvl ${level} today.`,
      footer: `Made with <i class="fas fa-heart"></i> by <a href="https://diamant.dev" target="_blank" rel="noopener noreferrer">Diamant</a>. - <a id="tweet" href="https://twitter.com/intent/tweet?text=Today, I'm ${
        matchNameVowel ? 'an' : 'a'
      } ${matchName} lvl ${level}, and you? Check here:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app" target="_blank">Share on twitter.</a>`,
      Offfooter: `Made with <i class="fas fa-heart"></i> by Diamant. - Offline mode.`,
    },
  };
  return language[userLang];
};

getData(dataGet.pokemonID, difference, online).then((data) => {
  if (dataGet.date != 0 && difference) historyAdd(dataGet);
  localStorage.setItem('dataCache', JSON.stringify(data));
  const send = {
    pokemonID: data.ID,
    date: difference ? dateNow : lastDay,
    level: difference ? Math.round(Math.random() * 99 + 1) : dataGet.level,
    version: version,
  };
  localStorage.setItem('data', JSON.stringify(send));
  const languageText = language(data.Names, send.level, data.Name);

  img.alt = data.Name;
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.ImgID}.png`;

  hello.innerHTML = languageText.hello;
  you.innerHTML = languageText.you;
  footer.innerHTML = online ? languageText.footer : languageText.Offfooter;
  historyShowed(userLang);

  if (difference) {
    you.classList.add('reveal');
    img.classList.add('reveal');
  }

  document.body.classList.add('ready', data.Type as string);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../sw.js');
  }
});
