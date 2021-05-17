import { Drawable } from '../models/Drawable.js';
import { Tile } from '../models/Snake.js';
import Food from './Food.js';

export default class Snake implements Drawable {
	initialXPos: number = 100;
	initialYPos: number = 100;

	numOfStartingBlocks: number = 4;

	private verticalSpeed: number = 0;
	private horizontalSpeed: number = (-1) * this.tileSize;

	tiles: Tile[] = [];
	
	constructor(
		public readonly tileSize: number,
		private tileColor: string,
		private headColor: string,
	) {
		this.resetCoordinates();
	}

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
		const head: Tile = {
			x: this.tiles[0].x + this.horizontalSpeed,
			y: this.tiles[0].y + this.verticalSpeed
		}

		this.tiles.unshift(head);
		if (head.x === food.xCoordinate && head.y === food.yCoordinate) {
			food.generateCoordinates(this.tiles);
		}
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
		this.tiles = [];
		
		for (let i = 0; i < this.numOfStartingBlocks; i++) {
			this.tiles.push({
				x: this.initialXPos,
				y: this.initialYPos
			});

			this.initialXPos += this.tileSize;
		}
	}

	/**
	 * Changes the snake's direction. note that the horizontal and vertical speeds in this class represent directions
	 * with negative values indicating left and downwards, and positive ones indicating right and upwards.
	 * @param event 
	 */
	public changeDirection(event: KeyboardEvent) {
		let direction = '';
		const pressedKeyCode = event.code;

		// if (this._changingDirection) return; //used to prevent the snake from going into the reverse direction. for example, going up and then down
		// // the snake would have to wait for this function to return and for the Game loop to run again to be able to change direction
		// this._changingDirection = true;

		const goingUp = this.verticalSpeed === (-1) * this.tileSize;
		const goingDown = this.verticalSpeed === this.tileSize;
		const goingRight = this.horizontalSpeed === this.tileSize;
		const goingLeft = this.horizontalSpeed === (-1) * this.tileSize;

		if (pressedKeyCode === 'ArrowLeft' && !goingRight) {
			this.horizontalSpeed = (-1) * this.tileSize;
			this.verticalSpeed = 0;
			direction = 'left';
		}

		else if (pressedKeyCode === 'ArrowRight' && !goingLeft) {
			this.horizontalSpeed = this.tileSize;
			this.verticalSpeed = 0;
			direction = 'right';
		}

		else if (pressedKeyCode === 'ArrowUp' && !goingDown) {
			this.horizontalSpeed = 0;
			this.verticalSpeed = (-1) * this.tileSize;
			direction = 'down'
		}

		else if (pressedKeyCode === 'ArrowDown' && !goingUp) {
			this.horizontalSpeed = 0;
			this.verticalSpeed = this.tileSize;
			direction = 'up'
		}

		console.log(`Changing direction to ${direction}`);
	}
}

// TODO: add the ability to change the numOfStartingBlocks and initialX and Y values.