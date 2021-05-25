import Game from "../classes/Game.js";

export default class TouchHandler {
	private mobileControlsDiv: HTMLDivElement;

	/**
	 * Initializes touch event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) {
		this.mobileControlsDiv = document.getElementById('mobile-controls') as HTMLDivElement;
		this.mobileControlsDiv.addEventListener('click', this);
	 }

	public handleEvent(event: MouseEvent) {
		const eventTarget = event.target as HTMLDivElement;
		if (eventTarget.dataset.code) {
			this.snakeGame.snake.changeDirection(eventTarget.dataset.code);
		}
	}
}