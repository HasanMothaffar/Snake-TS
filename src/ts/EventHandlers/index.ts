import Game from "../classes/Game.js";
import KeyboardHandler from "./KeyboardHandler.js";
import TouchHanlder from "./TouchHandler.js";
import ScoreHandler from "./ScoreHandler.js";
import OptionsHandler from "./OptionsHandler.js";

/**
 * Registers touch, keyboard, theme, and score event listeners for the `snakeGame` parameter.
 * @param snakeGame The snake game instance to add event listeners to.
 */
export function registerEventHandlers(snakeGame: Game): void {

	/* -- Controls -- */
	const keyboardHandler = new KeyboardHandler(snakeGame);
	const touchHandler = new TouchHanlder(snakeGame);

	/* -- Score -- */
	const scoreHandler = new ScoreHandler(snakeGame);

	/* -- Options -- */
	const optionsHandler = new OptionsHandler(snakeGame);
	
}