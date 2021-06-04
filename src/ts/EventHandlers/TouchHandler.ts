import Game from "../classes/Game";

export default class TouchHandler {
	/**
	 * The div that contains control arrows for mobile screens.
	 */
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
		// Event target might be an svg element, but I want the parent button element instead.
		const eventTarget = (event.target as HTMLDivElement).closest('button')!;
		
		if (eventTarget !== null && eventTarget.dataset.code) {
			this.snakeGame.snake.changeDirection(eventTarget.dataset.code);
		}
	}
}