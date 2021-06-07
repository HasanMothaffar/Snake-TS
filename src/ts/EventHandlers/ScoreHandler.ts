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
	 * The sound effect to play when the snake eats a piece of food.
	 */
	private foodEatenAudio = new Audio('./dist/sounds/eat-food.wav');

	/**
	 * Initializes score event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		this.scoreSpan = document.getElementById('score')!;
		this.scoreAnimationSpan = document.querySelector('.score-animation')!;

		document.addEventListener('food-eaten', () => this.increaseScore());
		document.addEventListener('reset-score', () => this.resetScore());
	}

	/**
	 * Increases the player's score by 1.
	 */
	private increaseScore(): void {
		let currentScore = this.scoreSpan.innerHTML;
		let newScore = parseInt(currentScore) + 1;

		this.scoreSpan.innerHTML = newScore.toString();
		this.playScoreAnimation();
		this.foodEatenAudio.play();
	}

	/**
	 * Resets the player's score to 0.
	 */
	private resetScore(): void {
		this.scoreSpan.innerHTML = '0';
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