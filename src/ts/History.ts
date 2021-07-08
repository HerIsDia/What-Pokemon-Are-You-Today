import { DataLS, Event, historyDOM, userLang } from '.';
import { getData } from './getData';
import { Color } from './Interfaces';
interface Name {
  language: Color;
  name: string;
}

export const history = (JSON.parse(
  localStorage.getItem('event') as string
) as Event) || { done: false, pokemon: [] };

export const historyAdd = (data: DataLS, lvl: number, datapk: any) => {
  history.pokemon.push(data);
  setDiv(datapk, lvl);
  localStorage.setItem('event', JSON.stringify(history));
};

export const historyShowed = () => {
  history.pokemon.forEach((poke) => {
    getData(poke.pokemonID).then((data) => {
      setDiv(data, poke.level);
    });
  });
};

const setDiv = (data: any, lvl: number) => {
  const matchName =
    data.Names.filter((lang: Name) => lang.language.name == userLang)[0] !=
    undefined
      ? data.Names.filter((lang: Name) => lang.language.name == userLang)[0]
          .name
      : data.Names[0] != undefined
      ? data.Names[0].name
      : data.Name;
  const div = document.createElement('div');
  div.className = data.Type;
  div.innerHTML = `<img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.ImgID}.png"
              alt="${data.Name}"
              crossorigin="anonymous"
            />
            <p>${matchName}<br />
            <span>Level ${lvl}.</span></p>`;
  historyDOM.appendChild(div);
};
