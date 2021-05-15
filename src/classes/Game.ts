import Snake from "./Snake.js";
import Canvas from "./Canvas.js";
import Food from "./Food.js";

export default class Game {
	private food: Food;
	private gameInterval!: ReturnType< typeof setInterval >;
	private gameSpeed: number = 100;
	private running!: boolean;

	constructor(
		public readonly snake: Snake,
		private canvas: Canvas,
	) {
		this.food = new Food(this.snake.tileSize, 'lightgreen', 'yellow', this.canvas.width, this.canvas.height);
		this.initialRender();
	}

	public isGameRunning(): boolean {
		return this.running;
	}

	/**
	 * checks if the game should continue or not
	 * @returns {boolean} whether the snake hit any of the boundaries or ate itself
	 */
	private hasSnakeGameEnded(): boolean {
		// the snake can only eat one of its own tiles if its length is > 4
		const head = this.snake.snakeHead;
		for (let i = 4; i < this.snake.tiles.length; i++) {
			// checking if the snake's head collides with any of its other tiles
			if (this.snake.tiles[i].x === head.x && this.snake.tiles[i].y === head.y) {
				return true;
			}
		}

		const hitLeftWall = head.x < 0;
		const hitRightWall = head.x > this.canvas.width - this.snake.tileSize; //the tile with the coordinate 'this.canvas.width - this.snake.tileSize' is the last tile in the canvas. therefore, here we're checking if the head of the snake is past this tile
		const hitToptWall = head.y < 0;
		const hitBottomWall = head.y > this.canvas.height - this.snake.tileSize;

		return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
	}

	private initialRender() {
		this.canvas.clear();
		this.canvas.drawElement(this.snake);
	}
	
	public start(resume: boolean = false) {
		if (!this.running) {
			this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
			this.food.generateCoordinates(this.snake.tiles);
			this.running = true;
		}	
	}

	public resume() {
		if (!this.running) {
			this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
			this.running = true;
		}
	}

	public pause() {
		clearInterval(this.gameInterval);
		this.running = false;
	}
	
	public restart() {
		this.snake.resetCoordinates();

		/* 
			It's necessary that the food coordinates be generated 
			only after the snake's coordinates have been reset, 
			because the generateCoordinates function depends on the 
			snake's tiles array.
		*/
		this.food.generateCoordinates(this.snake.tiles);

		this.initialRender();
	}

	private renderGame() {
		this.canvas.clear();

		this.canvas.drawElement(this.snake);
		this.canvas.drawElement(this.food);
	}
}