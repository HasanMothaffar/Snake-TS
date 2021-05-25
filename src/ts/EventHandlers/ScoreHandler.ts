import Game from "../classes/Game.js";

export default class ScoreHandler {
	
	/**
	 * Initializes score event listeners for the snake game.
	 * @param snakeGame Snake game instance to attach the event listeners to.
	 */
	constructor(private snakeGame: Game) { 
		document.addEventListener('food-eaten', this);
	}

	/**
	 * Increases the game's score by 1.
	 * @param event The 'food-eaten' custom event.
	 */
	public handleEvent(event: CustomEvent) {
		this.updateScoreText();
		this.playScoreAnimation();
	}

	/**
	 * Updates the innerHTML property of the score div.
	 */
	private updateScoreText() {
		const score = document.getElementById('score')!;
		score.innerHTML = (parseInt(score.innerHTML) + 1).toString();
	}

	/**
	 * Plays the +1 score animation.
	 */
	private playScoreAnimation() {
		const scoreAnimation = document.querySelector('.score-animation')!;
		scoreAnimation.classList.add('animated');

		// Remove the animation class after the animation ends.
		scoreAnimation.addEventListener('animationend', (event) => {
			scoreAnimation.classList.remove('animated');
		})
	}
}