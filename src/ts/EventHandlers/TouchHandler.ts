import Game from "../classes/Game.js";

export default class TouchHandler {

	/**
	 * Initializes touch event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { }

	public handleEvent(event: MouseEvent) {
		const eventTarget = event.target as HTMLDivElement;
		if (eventTarget.dataset.code) {
			this.snakeGame.snake.changeDirection(eventTarget.dataset.code);
		}
	}
}