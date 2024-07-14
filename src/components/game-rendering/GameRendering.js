import "./game-rendering.css";

export default class GameRendering {
  constructor(element) {
    element = document.querySelector(element);
    this._element = element;
  }

  gridGenerator() {
    const scoreBoard = `
      <div class="scoreboard">
        <div>Убито - <span class="dead">0</span></div>
        <div>Пропущено - <span class="skipped">0</span></div>
      </div>
      <div class="container"></div>
    `;

    const gameGrid = `<div class="cell"></div>`;

    this._element.insertAdjacentHTML("beforeEnd", scoreBoard);

    for (let i = 0; i < 16; i++) {
      this._element.querySelector(".container").insertAdjacentHTML("beforeEnd", gameGrid);
    }
  }
}
