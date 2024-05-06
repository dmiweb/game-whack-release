import "./game-rendering.css";

export default class GameRendering {
  constructor(element) {
    element = document.querySelector(element);
    this._element = element;
  }

  gridGenerator() {
    this._element.insertAdjacentHTML(
      "beforeEnd",
      `
        <div class="scoreboard">
          <div>Убито - <span class="dead">0</span></div>
          <div>Пропущено - <span class="skipped">0</span></div>
        </div>
        <div class="container"></div>`,
    );

    for (let i = 0; i < 16; i++) {
      this._element
        .querySelector(".container")
        .insertAdjacentHTML("beforeEnd", '<div class="cell"></div>');
    }
  }
}
