import Game from "../classes/Game.js";
import KeyboardHandler from "./KeyboardHandler.js";
import TouchHanlder from "./TouchHandler.js";

/**
 * Registers touch, keyboard, theme, and score event listeners for the `snakeGame` parameter.
 * @param snakeGame The snake game instance to add event listeners to.
 */
export function registerEventHandlers(snakeGame: Game): void {
	const keyboardHandler = new KeyboardHandler(snakeGame);
	const touchHandler = new TouchHanlder(snakeGame);

	const darkModeInput = document.getElementById('dark_mode_input')!;
	const mobileControlsDiv = document.getElementById('mobile-controls')!;

	document.addEventListener('keydown', keyboardHandler);
	document.addEventListener('food-eaten', updateScore);

	mobileControlsDiv.addEventListener('click', touchHandler);
	darkModeInput.addEventListener('change', () => toggleDarkMode(snakeGame));
}


function toggleDarkMode(snakeGame: Game) {
	document.documentElement.classList.toggle('dark');
	snakeGame.switchColorTheme();
}

/**
 * Increases the game's score by 1.
 */
function updateScore() {
	const score = document.getElementById('score')!;
	score.innerHTML = (parseInt(score.innerHTML) + 1).toString();
}