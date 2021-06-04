import Game from "../classes/Game";

export default class ScoreHandler {
	/**
	 * The span that contains the game's score.
	 */
	private scoreSpan: HTMLSpanElement;

	/**
	 * The span that controls the game's score animation.
	 */
	private scoreAnimationSpan: HTMLSpanElement;

	/**
	 * Initializes score event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		this.scoreSpan = document.getElementById('score')!;
		this.scoreAnimationSpan = document.querySelector('.score-animation')!;

		document.addEventListener('food-eaten', this);
	}

	/**
	 * Increases the game's score by 1.
	 * @param event The 'food-eaten' custom event.
	 */
	public handleEvent() {
		this.updateScoreText();
		this.playScoreAnimation();
	}

	/**
	 * Updates the innerHTML property of the score span.
	 */
	private updateScoreText() {
		let currentScore = this.scoreSpan.innerHTML;
		let newScore = parseInt(currentScore) + 1;

		this.scoreSpan.innerHTML = newScore.toString();
	}

	/**
	 * Plays the +1 score animation.
	 */
	private playScoreAnimation() {
		this.scoreAnimationSpan.classList.add('animated');

		// Remove the animation class after the animation ends.
		this.scoreAnimationSpan.addEventListener('animationend', () => {
			this.scoreAnimationSpan.classList.remove('animated');
		})
	}
}