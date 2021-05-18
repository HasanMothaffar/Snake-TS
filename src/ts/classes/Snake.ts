import { Tile, Drawable } from "../models/index.js";
import Food from './Food.js';

export default class Snake implements Drawable {
	/**
	 * The initial X coordinate for the first tile of the snake.
	 */
	private initialXPos: number = 100;

	/**
	 * The initial Y coordinate for the first tile of the snake.
	 */
	private initialYPos: number = 100;

	/**
	 * The number of starting tiles in the snake's array.
	 */
	private numOfStartingBlocks: number = 4;

	/**
	 * Indicates whether the snake is going up or down.
	 */
	private verticalSpeed: number = 0;

	/**
	 * Indicates whether the snake is going left or right.
	 */
	private horizontalSpeed: number = (-1) * this.tileSize;

	/**
	 * The snake's tiles' array.
	 */
	private _tiles: Tile[] = [];
	
	/**
	 * Initializes a new snake and adjusts its coordinates.
	 * @param tileSize The snake's tile size in pixels.
	 * @param tileColor The color of normal tiles.
	 * @param headColor The color of the first tile (the head).
	 */
	constructor(
		public readonly tileSize: number,
		private tileColor: string,
		private headColor: string,
	) {
		this.resetCoordinates();
	}
	/**
	 * Returns the snake's tiles' array.
	 */
	get tiles(): Tile[] {
		return this._tiles;
	}

	/**
	 * Returns the snake's head tile.
	 */
	get snakeHead(): Tile {
		return this.tiles[0];
	}

	/* -- DRAWING LOGIC -- */
	private drawSnakeTile(tile: Tile, tileIndex: number, parentCanvasContext: CanvasRenderingContext2D) {
		parentCanvasContext.fillStyle = tileIndex === 0 ? this.headColor : this.tileColor;
		parentCanvasContext.strokeStyle = 'darkblue';

		const { x, y } = tile;

		parentCanvasContext.fillRect(x, y, this.tileSize, this.tileSize);
		parentCanvasContext.strokeRect(x, y, this.tileSize, this.tileSize);
	}

	public drawOnCanvas(context: CanvasRenderingContext2D) {
		this.tiles.forEach((tile, tileIndex) => {
			this.drawSnakeTile(tile, tileIndex, context);
		});
	}

	public move(food: Food) {
		const newHead: Tile = {
			x: this.tiles[0].x + this.horizontalSpeed,
			y: this.tiles[0].y + this.verticalSpeed
		}

		this.tiles.unshift(newHead);

		// Generate a new piece of food if the snake's head collides with it (i.e. the snake eats the food)
		if (newHead.x === food.xCoordinate && newHead.y === food.yCoordinate) {
			food.generateCoordinates(this.tiles);
		}

		// The snake moves normally in this case
		else {
			this.tiles.pop();
		}
	}

	private resetSpeeds() {
		this.horizontalSpeed = (-1) * this.tileSize;
		this.verticalSpeed = 0;
	}

	public resetCoordinates() {
		this.resetSpeeds();
		this._tiles = [];

		let firstXPos = this.initialXPos;
		let firstYPos = this.initialYPos;
		
		for (let i = 0; i < this.numOfStartingBlocks; i++) {
			this.tiles.push({
				x: firstXPos,
				y: firstYPos
			});

			firstXPos += this.tileSize;
		}
	}

	/**
	 * Changes the snake's direction. note that the horizontal and vertical speeds in this class represent directions
	 * with negative values indicating left and downwards, and positive ones indicating right and upwards.
	 * @param event The keyboard's keydown event
	 */
	public changeDirection(event: KeyboardEvent) {
		const pressedKeyCode = event.code;

		// if (this._changingDirection) return; //used to prevent the snake from going into the reverse direction. for example, going up and then down
		// the snake would have to wait for this function to return and for the Game loop to run again to be able to change direction
		// this._changingDirection = true;

		const goingUp = this.verticalSpeed === (-1) * this.tileSize;
		const goingDown = this.verticalSpeed === this.tileSize;
		const goingRight = this.horizontalSpeed === this.tileSize;
		const goingLeft = this.horizontalSpeed === (-1) * this.tileSize;

		if (pressedKeyCode === 'ArrowLeft' && !goingRight) {
			this.horizontalSpeed = (-1) * this.tileSize;
			this.verticalSpeed = 0;
		}

		else if (pressedKeyCode === 'ArrowRight' && !goingLeft) {
			this.horizontalSpeed = this.tileSize;
			this.verticalSpeed = 0;
		}

		else if (pressedKeyCode === 'ArrowUp' && !goingDown) {
			this.horizontalSpeed = 0;
			this.verticalSpeed = (-1) * this.tileSize;
		}

		else if (pressedKeyCode === 'ArrowDown' && !goingUp) {
			this.horizontalSpeed = 0;
			this.verticalSpeed = this.tileSize;
		}
	}
}