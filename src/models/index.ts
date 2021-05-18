export interface Tile {
	/**
	 * Tile's X coordinate on the canvas.
	 */
	x: number,

	/**
	 * Tile's Y coordinate on the canvas.
	 */
	y: number
}


// TODO: Implement this class using a linked list?	
// Queue: Maximum size = (canvas.width * canvas.height) / (snake.tileSize * snake.tileSize)
// export class Tiles<Type> {
// 	push() {

// 	}

// 	pop() {

// 	}
// }

/**
 * Represents an element that can be drawn on the canvas.
 */
export interface Drawable {
	drawOnCanvas(content: CanvasRenderingContext2D): void;
}

export type ColorTheme = 'white' | 'dark';