import Game from "../classes/Game.js";

export default class ThemeHandler {
	
	/**
	 * Initializes theme event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { }
	
	public handleEvent(event: Event) {
		document.documentElement.classList.toggle('dark');
		this.snakeGame.switchColorTheme();
	}
}