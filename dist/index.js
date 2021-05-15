import SnakeGame from "./classes/Game.js";
import Snake from "./classes/Snake.js";
import Canvas from "./classes/Canvas.js";
import KeyboardHandler from "./classes/KeyboardHandler.js";
var canvas = new Canvas('snakeBoard', 400, 400);
var snake = new Snake(20, 'darkgreen', 'yellow');
var snakeGame = new SnakeGame(snake, canvas);
var keyboardHandler = new KeyboardHandler(snakeGame);
document.addEventListener('keydown', keyboardHandler);
//# sourceMappingURL=index.js.map