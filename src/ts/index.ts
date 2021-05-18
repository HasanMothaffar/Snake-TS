import SnakeGame from "./classes/Game.js";
import Snake from "./classes/Snake.js";
import Canvas from "./classes/Canvas.js";
import KeyboardHandler from "./classes/KeyboardHandler.js";

const canvas = new Canvas('snakeBoard', 500, 500);
const snake = new Snake(20, 'darkgreen', 'yellow');
const snakeGame = new SnakeGame(snake, canvas);

const keyboardHandler = new KeyboardHandler(snakeGame);

document.addEventListener('keydown', keyboardHandler);