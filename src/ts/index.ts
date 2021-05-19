import SnakeGame from "./classes/Game.js";
import Snake from "./classes/Snake.js";
import Canvas from "./classes/Canvas.js";
import KeyboardHandler from "./classes/EventHandlers/KeyboardHandler.js";

// Reduce the dimensions of the canvas on smaller screens. This only happens when the game is loaded.
const mediaQuery = matchMedia('(max-width: 576px)'); 
let canvasWidth: number;
let canvasHeight: number;

if (mediaQuery.matches) {
	canvasWidth = canvasHeight = 300;
}

else {
	canvasWidth = canvasHeight = 500;
}	

const canvas = new Canvas('snakeBoard', canvasWidth, canvasHeight);
const snake = new Snake(20, 'darkgreen', 'yellow');
const snakeGame = new SnakeGame(snake, canvas);

const keyboardHandler = new KeyboardHandler(snakeGame);

function registerEventHandlers() {
	const darkModeInput = document.getElementById('dark_mode_input')!;

	document.addEventListener('keydown', keyboardHandler);
	document.addEventListener('food-eaten', updateScore);
	darkModeInput.addEventListener('change', toggleDarkMode);
}

function toggleDarkMode() {
	document.documentElement.classList.toggle('dark');
	canvas.switchColorTheme();
	snakeGame.updateCanvas();
}

function updateScore() {
	const score = document.getElementById('score')!;
	score.innerHTML = (parseInt(score.innerHTML) + 1).toString();
}

registerEventHandlers();