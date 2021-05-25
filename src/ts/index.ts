import SnakeGame from "./classes/Game.js";
import Snake from "./classes/Snake.js";
import Canvas from "./classes/Canvas.js";
import { registerEventHandlers } from "./EventHandlers/index.js";


// Reduce the dimensions of the canvas on smaller screens. This only happens when the game is loaded.
const mediaQuery = matchMedia('(max-width: 576px)');
let canvasWidth: number;
let canvasHeight: number;

if (mediaQuery.matches) {
	canvasWidth = canvasHeight = window.innerWidth - 40;
}

else {
	canvasWidth = canvasHeight = 500;
}

const canvas = new Canvas('snakeBoard', canvasWidth, canvasHeight);
const snake = new Snake(20, 'darkgreen', 'yellow');
const snakeGame = new SnakeGame(snake, canvas);

registerEventHandlers(snakeGame);