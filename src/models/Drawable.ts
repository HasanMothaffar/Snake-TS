/**
 * Represents an element that can be drawn on the canvas.
 */
export interface Drawable {
	drawOnCanvas(content: CanvasRenderingContext2D): void;
}