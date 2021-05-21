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

	/**
	 * Returns whether the snake has eaten a piece of food or not.
	 * @param newHead New head tile after the snake moves.
	 * @param food The current piece of food on the canvas.
	 */
	private hasSnakeEatenFood(newHead: Tile, food: Food): boolean {
		return newHead.x === food.xCoordinate && newHead.y === food.yCoordinate;
	}

	/**
	 * Dispatches a 'food-eaten' event in order for the score to increase.
	 * 
	 * The listener for this event can be found in the index.ts file.
	 */
	private dispatchFoodEatenEvent(): void {
		const foodEatenEvent = new Event('food-eaten');
		document.dispatchEvent(foodEatenEvent);
	}

	/**
	 * Draws an individual snake tile on the canvas.
	 * @param tile The snake tile to be drawn.
	 * @param tileIndex The index of the tile to be drawn (useful to know if it's the head tile).
	 * @param parentCanvasContext The 2D context of the canvas upon which the tile will be drawn.
	 */
	private drawSnakeTile(tile: Tile, tileIndex: number, parentCanvasContext: CanvasRenderingContext2D) {
		parentCanvasContext.fillStyle = tileIndex === 0 ? this.headColor : this.tileColor;
		parentCanvasContext.strokeStyle = 'darkblue';
		
		const { x, y } = tile;
		parentCanvasContext.fillRect(x, y, this.tileSize, this.tileSize);
		parentCanvasContext.strokeRect(x, y, this.tileSize, this.tileSize);
	}

	/**
	 * Draws the whole snake on the canvas.
	 * @param context The 2D context of the canvas upon which the tile will be drawn.
	 */
	public drawOnCanvas(context: CanvasRenderingContext2D) {
		this.tiles.forEach((tile, tileIndex) => {
			this.drawSnakeTile(tile, tileIndex, context);
		});
	}

	/**
	 * Moves the tiles of the snake.
	 * @param food The piece of food that the snake will eat.
	 */
	public move(food: Food) {
		const newHead: Tile = {
			x: this.tiles[0].x + this.horizontalSpeed,
			y: this.tiles[0].y + this.verticalSpeed
		}

		this.tiles.unshift(newHead);

		// Generate a new piece of food and increase score if the snake has eaten the food
		if (this.hasSnakeEatenFood(newHead, food)) {
			food.generateCoordinates(this.tiles);
			this.dispatchFoodEatenEvent();
		}

		// The snake moves normally in this case
		else {
			this.tiles.pop();
		}
	}

	/**
	 * Resets the direction of the snake.
	 */
	private resetDirection() {
		this.horizontalSpeed = (-1) * this.tileSize;
		this.verticalSpeed = 0;
	}

	/**
	 * Resets the current tiles array and creates a new one with new coordinates.
	 */
	public resetCoordinates() {
		this.resetDirection();
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
	 * Changes the snake's direction. Note that the horizontal and vertical speeds in this class represent directions
	 * with negative values indicating left and downwards, and positive ones indicating right and upwards.
	 * @param pressedKeyCode The code of the pressed key.
	 */
	public changeDirection(pressedKeyCode: string) {

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