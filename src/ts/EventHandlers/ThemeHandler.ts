import Game from "../classes/Game.js";

export default class ThemeHandler {
	
	private darkModeInput: HTMLInputElement;

	/**
	 * Initializes theme event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		this.darkModeInput = document.getElementById('dark_mode_input') as HTMLInputElement;
		this.darkModeInput.addEventListener('change', this);
	}
	
	public handleEvent(event: Event) {
		document.documentElement.classList.toggle('dark');
		this.snakeGame.switchColorTheme();
	}
}