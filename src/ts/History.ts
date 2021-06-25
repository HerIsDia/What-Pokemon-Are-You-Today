import { DataLS } from '.';
import { getData } from './getData';
import { Color } from './Interfaces';
interface Name {
  language: Color;
  name: string;
}

const history =
  (JSON.parse(localStorage.getItem('history') as string) as [DataLS]) || [];
const historyDOM = document.querySelector('.history') as HTMLDivElement;

export const historyAdd = (data: DataLS) => {
  history.push(data);
  localStorage.setItem('history', JSON.stringify(history));
};

export const historyShowed = (userLang: string) => {
  if (history[0] != undefined) {
    const his = history.reverse();
    his.forEach((poke, i) => {
      if (i > 6) return;
      getData(poke.pokemonID).then((data) => {
        const matchName =
          data.Names.filter(
            (lang: Name) => lang.language.name == userLang
          )[0] != undefined
            ? data.Names.filter(
                (lang: Name) => lang.language.name == userLang
              )[0].name
            : data.Names[0] != undefined
            ? data.Names[0].name
            : data.Name;

        const dateSet = new Date(poke.date);
        const div = document.createElement('div');
        div.className = data.Type;
        div.innerHTML = `<img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                data.ImgID
              }.png"
              alt="${data.Name}"
              crossorigin="anonymous"
            />
            <p>${matchName} (${poke.level})<br />
            <span>${dateSet.toLocaleDateString()}</span></p>`;
        historyDOM.appendChild(div);
      });
    });
  } else {
    document.body.removeChild(historyDOM);
  }
};
