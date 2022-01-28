import Game from "../classes/Game";

export default class TouchHandler {
	/**
	 * The div that contains control arrows for mobile screens.
	 */
	private mobileArrowsDiv = document.getElementById('mobile-arrows') as HTMLDivElement;

	/**
	 * The pause and start buttons on mobile screens.
	 */
	private gameControlButtons = document.querySelectorAll('.game-controls-container button') as NodeListOf<HTMLButtonElement>;

	/**
	 * Initializes touch event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) {
		this.mobileArrowsDiv.addEventListener('click', (event: Event) => this.handleArrowsEvent(event));

		this.gameControlButtons.forEach((button) => {
			button.addEventListener('click', (event: Event) => {
				const eventCode = (event.target as HTMLButtonElement).dataset.toggle!;
				this.handleGameControlButtons(eventCode);
			})
		})
	 }

	private handleArrowsEvent(event: Event): void {
		// Event target might be an svg element, but I want the parent button element instead.
		const eventTarget = (event.target as HTMLDivElement).closest('button')!;
		
		if (eventTarget !== null && eventTarget.dataset.code) {
			this.snakeGame.snake.changeDirection(eventTarget.dataset.code);
		}
	}

	private handleGameControlButtons(buttonCode: string): void {
		let code;
		if (buttonCode === 'start') code = 'Space';
		else if (buttonCode === 'restart') code = 'KeyR';

		document.dispatchEvent(new KeyboardEvent('keydown', {
			code: code
		}))
	}

}