import "../scss/app.scss";
import SnakeGame from "./classes/Game";
import Snake from "./classes/Snake";
import Canvas from "./classes/Canvas";
import { registerEventHandlers } from "./eventHandlers/index";


// Reduce the dimensions of the canvas on smaller screens. This only happens when the game is loaded.
const mediaQuery = matchMedia('(max-width: 576px)');
let canvasWidth: number;
let canvasHeight: number;

if (mediaQuery.matches) {
	canvasWidth = canvasHeight = window.innerWidth - 50;
}

else {
	canvasWidth = canvasHeight = 500;
}

const canvas = new Canvas('snakeBoard', canvasWidth, canvasHeight);
const snake = new Snake(20, 'darkgreen', 'yellow');
const snakeGame = new SnakeGame(snake, canvas);

registerEventHandlers(snakeGame);