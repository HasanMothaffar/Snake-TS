import Game from "../../classes/Game.js";

export function toggleDarkMode(snakeGame: Game) {
	document.documentElement.classList.toggle('dark');
	snakeGame.switchColorTheme();
}