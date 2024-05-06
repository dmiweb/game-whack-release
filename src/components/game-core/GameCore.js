import { getRandomNumber } from "../../js/getRandomNumber";

export default class GameCore {
  constructor(element, gridGenerator) {
    element = document.querySelector(element);
    this._element = element;
    this._gridGenerator = gridGenerator;
    this.currentCellGoblin = null;
    this.totalSteps = -1;
    this.idInterval = null;
    this.stopGame = false;
  }

  addGoblin() {
    const cells = this._element.querySelectorAll(".cell");
    let indexRandom = getRandomNumber(0, cells.length - 1);

    while (
      cells[indexRandom].classList.contains("goblin") ||
      indexRandom === this.currentCellGoblin
    ) {
      indexRandom = getRandomNumber(0, cells.length - 1);
    }

    for (const cell of cells) {
      this.removeGoblin(cell);
    }

    cells[indexRandom].classList.add("goblin");
    this.currentCellGoblin = indexRandom;
  }

  removeGoblin(element) {
    element.classList.remove("goblin");
  }

  gameScoring() {
    const killedGoblins = document.querySelector(".dead");
    const skippedGoblins = document.querySelector(".skipped");

    this._element.querySelector(".container").addEventListener("click", (e) => {
      if (e.target.classList.contains("goblin")) {
        e.target.classList.remove("goblin");
        killedGoblins.textContent++;
      }
    });

    this.totalSteps++;
    skippedGoblins.textContent =
      this.totalSteps - Number(killedGoblins.textContent);

    if (this.totalSteps - Number(killedGoblins.textContent) === 5) {
      alert("Вы проиграли!");
      document.body.innerHTML = "";
      killedGoblins.textContent = 0;
      skippedGoblins.textContent = 0;
      this.totalSteps = -1;
      this.stopGame = true;
    }
  }

  start() {
    this._gridGenerator();

    this.idInterval = setInterval(() => {
      this.addGoblin();
      this.gameScoring();

      if (this.stopGame === true) {
        clearInterval(this.idInterval);
        this.stopGame = false;
        this.start();
      }
    }, 1000);
  }
}
