import Game from "../classes/Game.js";

export default class DifficultyHanlder {
	private difficultyController: HTMLSelectElement;

	/**
	 * Initializes difficulty event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		this.difficultyController = document.getElementById('game-difficulty') as HTMLSelectElement;
		this.difficultyController.addEventListener('change', this);
	}

	handleEvent(event: Event) {
		const selectedIndex = this.difficultyController.selectedIndex;
		let newDifficulty = this.difficultyController.options[selectedIndex].value;

		this.snakeGame.changeDifficulty(parseInt(newDifficulty));
		
		this.difficultyController.blur();
	}
}