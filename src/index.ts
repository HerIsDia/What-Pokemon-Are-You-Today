import { getData } from './getData';
import { Color } from './Interfaces';

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
const dataGet: {
  pokemonID: number;
  date: number;
} = JSON.parse(localStorage.getItem('data') as string) || {
  date: 0,
};
const lastDay = dataGet.date;
const difference = dateNow - lastDay >= 86400000;

// HTML Element
const hello = document.querySelector('#hello') as HTMLHeadingElement;
const you = document.querySelector('#you') as HTMLParagraphElement;
const footer = document.querySelector('.footer') as HTMLParagraphElement;
const img = document.querySelector('img') as HTMLImageElement;
const icon = document.querySelector('.icon') as HTMLLinkElement;

const language = (Names: Name[]) => {
  const matchName =
    Names.filter((lang) => lang.language.name == userLang)[0] != undefined
      ? Names.filter((lang) => lang.language.name == userLang)[0].name
      : Names[0].name;
  const language = {
    fr: {
      hello: `${
        8 <= new Date().getHours() && new Date().getHours() <= 18
          ? 'Bonjour,'
          : 'Bonsoir,'
      }`,
      you: `Vous êtes un.e ${matchName} aujourd'hui.`,
      footer: `Créée avec <i class="fas fa-heart"></i> par <a href="https://diamant.dev" target="_blank" rel="noopener noreferrer">Diamant</a>. - <a id="tweet" href="https://twitter.com/intent/tweet?text=Today, Je suis un.e ${matchName}, et vous? Regardez ici:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app" target="_blank">Partager sur twitter.</a>`,
    },
    en: {
      hello: `Hello,`,
      you: `You are an ${matchName} today.`,
      footer: `Made with <i class="fas fa-heart"></i> by <a href="https://diamant.dev" target="_blank" rel="noopener noreferrer">Diamant</a>. - <a id="tweet" href="https://twitter.com/intent/tweet?text=Today, I'm an ${matchName}, and you? Check here:&hashtags=WhatPokemonAreYouToday,Pokemon&url=https://wpart.diams.app" target="_blank">Share on twitter.</a>`,
    },
  };
  return language[userLang];
};

getData(difference, dataGet.pokemonID).then((data) => {
  console.log(data);

  const send = {
    pokemonID: data.ID,
    date: difference ? dateNow : lastDay,
  };
  localStorage.setItem('data', JSON.stringify(send));
  const languageText = language(data.Names);

  img.alt = data.Name;
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.ImgID}.png`;
  icon.href = img.src;

  hello.innerHTML = languageText.hello;
  you.innerHTML = languageText.you;
  footer.innerHTML = languageText.footer;

  document.body.classList.add('ready', data.Type as string);
});
