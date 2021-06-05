import Game from "../classes/Game";

export default class DifficultyHanlder {
	/**
	 * The modal that contains the options of the game.
	 */
	private optionsModal = document.querySelector('.options') as HTMLDivElement;

	/**
	 * The button that opens the options modal.
	 */
	private optionsModalOpenButton = document.querySelector('.btn--open-modal') as HTMLButtonElement;

	/**
	 * The button that closes the options modal. It's placed inside the modal itself.
	 */
	private optionsModalCloseButton= document.querySelector('.btn--close-modal') as HTMLButtonElement;;

	/**
	 * The theme toggle button.
	 */
	private darkModeInput: HTMLInputElement = document.getElementById('dark_mode_input') as HTMLInputElement;

	/**
	 * The select tag that changes the game's difficulty.
	 */
	private difficultyController = document.getElementById('game-difficulty') as HTMLSelectElement;

	/**
	 * Initializes options event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		// Options modal close and open buttons
		this.optionsModalOpenButton.addEventListener('click', (event: Event) => this.openOptionsModal());
		this.optionsModalCloseButton.addEventListener('click', (event: Event) => this.closeOptionsModal());

		// Theme change button
		this.darkModeInput.addEventListener('change', (event: Event) => this.changeTheme());

		// Difficulty controller
		this.difficultyController.addEventListener('change', (event: Event) => this.changeDifficulty(event));
	}

	/**
	 * Opens the options modal, which causes the game to pause.
	 */
	private openOptionsModal(): void {
		this.optionsModal.classList.add('open');
		this.snakeGame.pause();
	}

	/**
	 * Closes the options modal.
	 */
	private closeOptionsModal(): void {
		this.optionsModal.classList.remove('open');
	}

	/**
	 * Changes the game's theme.
	 */
	private changeTheme(): void {
		this.snakeGame.switchColorTheme();
	}

	/**
	 * Calls the snake game's changeDifficulty method.
	 * @param event The difficulty controller's change event.
	 */
	private changeDifficulty(event: Event): void {
		const newDifficulty = this.getNewDifficulty();

		this.snakeGame.changeDifficulty(newDifficulty);
		this.difficultyController.blur();
	}

	/**
	 * Returns the difficulty that the user specifies.
	 * 
	 * Note that difficulty is a number that indicates the game loop's speed in milliseconds.
	 */
	private getNewDifficulty(): number {
		const selectedDifficultyIndex = this.difficultyController.selectedIndex;
		const difficulty = this.difficultyController.options[selectedDifficultyIndex].value;

		return parseInt(difficulty);
	}

}