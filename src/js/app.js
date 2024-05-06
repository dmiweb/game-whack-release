import GameRendering from "../components/game-rendering/GameRendering";
import GameCore from "../components/game-core/GameCore";

document.addEventListener("DOMContentLoaded", () => {
  const grid = new GameRendering("body");

  const game = new GameCore("body", grid.gridGenerator);
  game.start();
});
