import Game from "../classes/Game.js";

export default class DifficultyHanlder {
	private optionsModal = document.querySelector('.options') as HTMLDivElement;
	private optionsModalOpenButton = document.querySelector('.open-modal') as HTMLButtonElement;
	private optionsModalCloseButton= document.querySelector('.close-modal') as HTMLButtonElement;;

	private darkModeInput: HTMLInputElement = document.getElementById('dark_mode_input') as HTMLInputElement;

	private difficultyController = document.getElementById('game-difficulty') as HTMLSelectElement;

	/**
	 * Initializes options event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		// Options modal
		this.optionsModalOpenButton.addEventListener('click', (event: Event) => this.openOptionsModal());
		this.optionsModalCloseButton.addEventListener('click', (event: Event) => this.closeOptionsModal());

		// Theme change button
		this.darkModeInput.addEventListener('change', (event: Event) => this.changeTheme());

		// Difficulty controller
		this.difficultyController.addEventListener('change', (event: Event) => this.changeDifficulty(event));
	}

	private openOptionsModal(): void {
		this.snakeGame.pause();
		this.optionsModal.classList.add('open');
	}

	private closeOptionsModal(): void {
		this.snakeGame.resume();
		this.optionsModal.classList.remove('open');
	}

	private changeTheme(): void {
		document.documentElement.classList.toggle('dark');
		this.snakeGame.switchColorTheme();
	}

	/**
	 * Calls the snake's game instance's changeDifficulty method.
	 * @param event The difficulty controller's change event.
	 */
	private changeDifficulty(event: Event): void {

		// Fetch the new difficulty.
		const selectedIndex = this.difficultyController.selectedIndex;
		let newDifficulty = this.difficultyController.options[selectedIndex].value;

		this.snakeGame.changeDifficulty(parseInt(newDifficulty));
		
		this.difficultyController.blur();
	}

}