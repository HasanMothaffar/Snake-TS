import Game from "./Game.js";

export default class KeyboardHandler {

	private gameHasStarted: boolean = false;

	/**
	 * Initializes keyboard event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { }


	handleEvent(event: KeyboardEvent) {
		const pressedKeyCode: string = event.code;

		if (pressedKeyCode === 'Space') {

			// Start the game
			if (this.gameHasStarted === false) {
				this.snakeGame.start();
				this.gameHasStarted = true;
			}

			// Pause/Resume the game if it has already started
			else if (this.snakeGame.isGameRunning()) {
				this.snakeGame.pause();
			}

			else {
				this.snakeGame.resume();
			}
			
		}

		else if (pressedKeyCode === 'KeyR') {
			// restart game
			this.snakeGame.restart();
			this.gameHasStarted = false;
		}

		else {
			this.snakeGame.snake.changeDirection(event);
		}
	}
	
}