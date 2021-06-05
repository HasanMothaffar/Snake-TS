import Snake from "./Snake";
import Canvas from "./Canvas";
import Food from "./Food";

export default class Game {
	/**
	 * The game's piece of food.
	 */
	private food: Food;

	/**
	 * The main game loop.
	 */
	private gameInterval!: ReturnType< typeof setInterval >;

	/**
	 * The game loop's speed, in milliseconds.
	 */
	private gameSpeed: number = 300;

	/**
	 * A flag that indicates whether the game is running or not.
	 */
	private running!: boolean;

	/**
	 * Initializes a new piece of food and renders a static snake on the game's canvas.
	 * @param snake The game's snake.
	 * @param canvas The game's canvas.
	 */
	constructor(
		public readonly snake: Snake,
		private canvas: Canvas,
	) {
		this.food = new Food(this.snake.tileSize, 'lightgreen', 'yellow', this.canvas.width, this.canvas.height);
		this.initialRender();
	}

	/**
	 * Checks if the game should continue or not.
	 * 
	 * The game stops whenever the snake hits any of the canvas' boundaries or eats itself.
	 */
	private hasSnakeGameEnded(): boolean {
		const head = this.snake.snakeHead;
		const context: Game = this;

		return snakeAteItself(context) || snakeHitBoundaries(context);


		function snakeAteItself(context: Game): boolean {
			// The snake can only eat one of its own tiles if its length is > 4
			for (let i = 4; i < context.snake.tiles.length; i++) {
				// Checking if the snake's head collides with any of its other tiles
				if (context.snake.tiles[i].x === head.x && context.snake.tiles[i].y === head.y) {
					return true;
				}
			}

			return false;
		}

		function snakeHitBoundaries(context: Game) {
			// The tile with the coordinate 'context.canvas.width - context.snake.tileSize' is the last tile in the canvas.
			const hitLeftWall = head.x < 0;
			const hitRightWall = head.x > context.canvas.width - context.snake.tileSize; 
			const hitToptWall = head.y < 0;
			const hitBottomWall = head.y > context.canvas.height - context.snake.tileSize;

			return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
		}
	}

	/**
	 * Resets the player's score to 0.
	 */
	private resetScore() {
		const score = document.getElementById('score')!;
		score.innerHTML = (0).toString();
	}

	/**
	 * Renders a static snake on the canvas.
	 */
	private initialRender(): void {
		this.canvas.clear();
		this.canvas.drawElement(this.snake);
	}

	/**
	 * Moves the snake and draws its tiles and the piece of food.
	 */
	private renderGame(): void {

		if (this.hasSnakeGameEnded()) {
			clearInterval(this.gameInterval);
			this.running = false;
			this.changeGameState('You died :( Press "R" to restart the game.')
			return;
		}

		this.canvas.clear();
		this.snake.move(this.food);

		this.canvas.drawElement(this.snake);
		this.canvas.drawElement(this.food);
	}

	/**
	 * Starts the game.
	 */
	public start(): void {
		if (!this.running) {
			this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
			this.food.generateCoordinates(this.snake.tiles);
			this.running = true;
			this.changeGameState('')
		}
	}

	/**
	 * Pauses the game.
	 */
	public pause(): void {
		clearInterval(this.gameInterval);
		this.running = false;
		this.changeGameState('Paused...');
	}

	/**
	 * Resumes a paused game.
	 */
	public resume(): void {
		if (!this.running) {
			this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
			this.running = true;
			this.changeGameState('');
		}
	}

	/**
	 * Restarts the game.
	 */
	public restart(): void {
		this.snake.resetCoordinates();
		this.resetScore();
		this.changeGameState('')

		/* 
			It's necessary that the food coordinates be generated 
			only after the snake's coordinates have been reset, 
			because the generateCoordinates function depends on the 
			snake's tiles array.
		*/
		this.food.generateCoordinates(this.snake.tiles);
		this.initialRender();
	}

	/**
	 * Returns whether the game is running or not.
	 */
	public isGameRunning(): boolean {
		return this.running;
	}

	/**
	 * Switches color themes between dark and white modes.
	 */
	public switchColorTheme(): void {
		document.documentElement.classList.toggle('dark');
		this.canvas.switchColorTheme();

		// Updates the canvas with new colors and redraws all elements on it
		this.canvas.clear();
		this.canvas.drawElement(this.snake);
		this.canvas.drawElement(this.food);
	}

	/**
	 * Changes the game's difficulty by increasing the main loop's speed.
	 * @param difficulty The new difficulty (new loop's speed).
	 */
	public changeDifficulty(difficulty: number): void {
		this.gameSpeed = difficulty;
		
		/* 
			Without checking for the running property, the game would
			immediately run after changing the difficulty, even if it were paused
			in the first place.		
		*/ 
		if (this.isGameRunning()) {
			clearInterval(this.gameInterval);
			this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
		}
	}

	/**
	 * Changes the game state to indicate whether it's running or paused.
	 * @param state Next game state.
	 */
	private changeGameState(state: string): void {
		const gameStateDiv = document.querySelector('.game-state') as HTMLDivElement;
		gameStateDiv.innerHTML = state;
	}
}