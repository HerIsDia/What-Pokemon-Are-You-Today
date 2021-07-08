import { getData } from './getData';
import { historyAdd, historyShowed, history } from './History';

export interface Event {
  done: boolean;
  pokemon: [DataLS];
}

export interface DataLS {
  pokemonID: number;
  level: number;
}

// Language checker
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const userLang: 'fr' | 'en' =
  (urlParams.get('lang') || navigator.language.slice(0, 2)) == 'fr'
    ? 'fr'
    : 'en';

// Date
const done: DataLS =
  JSON.parse(localStorage.getItem('eventdone') as string) || false;

// HTML Element
const hello = document.querySelector('#hello') as HTMLHeadingElement;
const you = document.querySelector('#you') as HTMLParagraphElement;
export const historyDOM = document.querySelector('.history') as HTMLDivElement;

const language = () => {
  const language = {
    fr: {
      hello: `🌴 Les temps d'été ! 🌴`,
      you: `Voici votre équipe de pokémon de vos vacances d'été !`,
    },
    en: {
      hello: `🌴 Summer time ! 🌴`,
      you: `This is your summer vacation pokemon team !`,
    },
  };
  return language[userLang];
};

const languageText = language();

hello.innerHTML = languageText.hello;
you.innerHTML = languageText.you;

if (!history.done) {
  for (let index = 0; index < 6; index++) {
    getData(0, true).then((data) => {
      const send: DataLS = {
        pokemonID: data.ID as number,
        level: Math.round(Math.random() * 99 + 1),
      };
      historyAdd(send, send.level, data);
    });
  }
  history.done = true;
  localStorage.setItem('event', JSON.stringify(history));
} else {
  historyShowed();
}

document.body.classList.add('ready');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../sw.js');
}
