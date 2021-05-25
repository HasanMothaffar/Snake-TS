import Game from "../classes/Game.js";
import KeyboardHandler from "./KeyboardHandler.js";
import TouchHanlder from "./TouchHandler.js";
import ScoreHandler from "./ScoreHandler.js";
import ThemeHandler from "./ThemeHandler.js";

/**
 * Registers touch, keyboard, theme, and score event listeners for the `snakeGame` parameter.
 * @param snakeGame The snake game instance to add event listeners to.
 */
export function registerEventHandlers(snakeGame: Game): void {
	const keyboardHandler = new KeyboardHandler(snakeGame);
	const touchHandler = new TouchHanlder(snakeGame);
	const scoreHandler = new ScoreHandler(snakeGame);
	const themeHandler = new ThemeHandler(snakeGame);

	const darkModeInput = document.getElementById('dark_mode_input')!;
	const mobileControlsDiv = document.getElementById('mobile-controls')!;

	document.addEventListener('keydown', keyboardHandler);
	document.addEventListener('food-eaten', scoreHandler);

	mobileControlsDiv.addEventListener('click', touchHandler);
	darkModeInput.addEventListener('change', themeHandler);
}