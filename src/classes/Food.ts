export default class Food {
	/**
	 * X coordinate for the food
	 */
	private x: number;

	/**
	 * Y coordinate for the food
	 */
	private y: number;

	/**
	 * Initialize a new piece of food for the snake
	 * @param foodSize Size of the food tile
	 * @param foodColor Fill color for the piece of food
	 * @param foodBorderColor Fill color for the border of the piece of food
	 * @param XLimit Horizontal boundary that the food's coordinates cannot exceed
	 * @param YLimit Vertical boundary that the food's coordinates cannot exceed
	 */
	constructor(
		 private foodSize: number,
		 private foodColor: string,
		 private foodBorderColor: string,

		 private XLimit: number,
		 private YLimit: number,
	) {
		this.x = this.randomCoordinate(0, this.XLimit - this.foodSize);
		this.y = this.randomCoordinate(0, this.YLimit - this.foodSize);
	}

	/**
	 * draws the piece of food in the parent canvas
	 * @param {CanvasRenderingContext2D} context - context of the parent canvas
	 * @returns {void}
	 */
	drawOnCanvas(context) {
		context.fillStyle = this.foodColor;
		context.strokeStyle = this.foodBorderColor;

		context.fillRect(this._x, this._y, this._foodSize, this._foodSize);
		context.strokeRect(this._x, this._y, this._foodSize, this._foodSize);
	}

	/**
	 * generate coordinates for the piece of food.
	 * @param {Array} tiles - array of tiles that the snake occupies 
	 * @returns {void}
	 */
	generateCoordinates(tiles) {
		this.x = this.randomCoordinate(0, this.XLimit - this.foodSize);
		this.y = this.randomCoordinate(0, this.YLimit - this.foodSize);
		// as long as the generated coordinates overlap with the snake's tiles, call this function again to generate another pair of coordinates
		while (this._foodCollidesWithSnake(tiles))
			this.generateCoordinates(tiles);
	}
	/**
	 * returns true if the randomly generated piece of food lies on top of any of the snake's tiles
	 * @param {Array} tiles - array of tiles that the snake occupies 
	 * @returns {boolean}  
	 */
	_foodCollidesWithSnake(tiles) {
		return tiles.some(tile => tile.x == this.x && tile.y == this.y);
	}

	/**
	 * Generate a random coordinate for the snake's food
	 * @param min - Usually 0, which is the starting point of the canvas
	 * @param max - The furthest place on the canvas upon which the piece of food can be generated
	 * @returns A random number representing a coordinate. Note that this isn't an (x, y) pair. it's just a single number
	 */
	private randomCoordinate(min: number, max: number) {
		return Math.round((Math.random() * (max - min) + min) / this.foodSize) * this.foodSize;
	}
}