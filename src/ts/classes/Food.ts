import { Drawable, Tile } from "../models/index";

export default class Food implements Drawable{
	/**
	 * The food's X coordinate.
	 */
	private x!: number;

	/**
	 * The food's Y coordinate.
	 */
	private y!: number;

	/**
	 * Initializes a new piece of food for the snake.
	 * @param foodSize Size of the food tile.
	 * @param foodColor Fill color for the piece of food.
	 * @param foodBorderColor Fill color for the border of the piece of food.
	 * @param XLimit Horizontal boundary that the food's coordinates cannot exceed.
	 * @param YLimit Vertical boundary that the food's coordinates cannot exceed.
	 */
	constructor(
		 private foodSize: number,
		 private foodColor: string,
		 private foodBorderColor: string,

		 private XLimit: number,
		 private YLimit: number,
	) { 

	}

	/* -- Getters that are used in the Snake.ts class -- */

	/**
	 * Returns the food's X coordinate.
	 */
	get xCoordinate(): number {
		return this.x;
	}

	/**
	 * Returns the food's Y coordinate.
	 */
	get yCoordinate(): number {
		return this.y;
	}
	
	/**
	 * Draws the piece of food on the parent canvas.
	 * @param context Canvas upon which to draw the piece of food.
	 */
	public drawOnCanvas(context: CanvasRenderingContext2D): void {
		context.fillStyle = this.foodColor;
		context.strokeStyle = this.foodBorderColor;

		context.fillRect(this.x, this.y, this.foodSize, this.foodSize);
		context.strokeRect(this.x, this.y, this.foodSize, this.foodSize);
	}

	/**
	 * Generates coordinates for the piece of food.
	 * @param tiles Array of tiles that the snake occupies.
	 */
	public generateCoordinates(tiles: Tile[]): void {
		this.x = this.getRandomCoordinate(0, this.XLimit - this.foodSize);
		this.y = this.getRandomCoordinate(0, this.YLimit - this.foodSize);

		// As long as the generated coordinates overlap with the snake's tiles, call this function again to generate another pair of coordinates.
		while (this.foodCollidesWithSnake(tiles))
			this.generateCoordinates(tiles);
	}
	
	/**
	 * Checks whether the randomly generated piece of food collides with any of the snake's tiles.
	 * @param tiles Snake's array of tiles.
	 * @returns 
	 */
	private foodCollidesWithSnake(tiles: Tile[]): boolean {
		return tiles.some(tile => tile.x === this.x && tile.y === this.y);
	}

	/**
	 * Generates a random coordinate for the piece of food.
	 * @param min Usually 0, which is the starting point of the canvas.
	 * @param max The furthest point on the canvas upon which the piece of food can be generated.
	 * @returns A random number representing a coordinate. Note that this isn't an (x, y) pair. it's just a single number.
	 */
	private getRandomCoordinate(min: number, max: number): number {
		return Math.round((Math.random() * (max - min) + min) / this.foodSize) * this.foodSize;
	}
}