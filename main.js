/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/game-rendering/GameRendering.js

class GameRendering {
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
;// CONCATENATED MODULE: ./src/js/getRandomNumber.js
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
;// CONCATENATED MODULE: ./src/components/game-core/GameCore.js

class GameCore {
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
    while (cells[indexRandom].classList.contains("goblin") || indexRandom === this.currentCellGoblin) {
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
    this._element.querySelector(".container").addEventListener("click", e => {
      if (e.target.classList.contains("goblin")) {
        e.target.classList.remove("goblin");
        killedGoblins.textContent++;
      }
    });
    this.totalSteps++;
    skippedGoblins.textContent = this.totalSteps - Number(killedGoblins.textContent);
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
;// CONCATENATED MODULE: ./src/js/app.js


document.addEventListener("DOMContentLoaded", () => {
  const grid = new GameRendering("body");
  const game = new GameCore("body", grid.gridGenerator);
  game.start();
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;