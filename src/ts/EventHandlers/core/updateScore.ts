/**
 * Increases the game's score by 1.
 */
export function updateScore() {
	updateScoreText();
	playScoreAnimation();

}

/**
 * Updates the innerHTML property of the score div.
 */
function updateScoreText() {
	const score = document.getElementById('score')!;
	score.innerHTML = (parseInt(score.innerHTML) + 1).toString();
}

/**
 * Plays the +1 score animation.
 */
function playScoreAnimation() {
	const scoreAnimation = document.querySelector('.score-animation')!;
	scoreAnimation.classList.add('animated');

	// Remove the animation class after the animation ends.
	scoreAnimation.addEventListener('animationend', (event) => {
		scoreAnimation.classList.remove('animated');
	})
}