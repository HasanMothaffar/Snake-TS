import Game from "./Game.js";

export default class KeyboardHandler {

	/**
	 * A flag that indicates whether the game has already started.
	 * Useful for handling the pause/resume game states.
	 */
	private gameHasStarted: boolean = false;

	/**
	 * Initializes keyboard event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { }

	/**
	 * Handles game states by listening to the keydown event.
	 * @param event The keyboard event that gets fired.
	 */
	public handleEvent(event: KeyboardEvent) {
		const pressedKeyCode: string = event.code;

		if (pressedKeyCode === 'Space') {
			this.handleSpacebar();
		}

		else if (pressedKeyCode === 'KeyR') {
			this.handleRKey();
		}

		else {
			this.snakeGame.snake.changeDirection(event);
		}
	}
	
	/**
	 * Starts/Pauses/Resumes the game.
	 * @param pressedKeyCode Code for the pressed key (space).
	 */
	private handleSpacebar(): void {
		// Start the game if it hasn't been started yet
		if (this.gameHasStarted === false) {
			this.snakeGame.start();
			this.gameHasStarted = true;
		}

		// Pause the game if it has already started and is currently running
		else if (this.snakeGame.isGameRunning()) {
			this.snakeGame.pause();
		}

		// The game is paused in this case, so resume it
		else {
			this.snakeGame.resume();
		}
	}

	/**
	 * Restarts the game.
	 * @param pressedKeyCode Code for the pressed key (R).
	 */
	private handleRKey(): void {
		this.snakeGame.restart();
		this.gameHasStarted = false;
	}
}