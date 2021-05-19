import { Drawable, ColorTheme } from "../models/index.js";

export default class Canvas {

	/**
	 * The canvas' DOM element reference.
	 */
	private canvas: HTMLCanvasElement;

	/**
	 * The actual 2D context upon which we draw things in the canvas.
	 */
	private ctx: CanvasRenderingContext2D;

	/**
	 * The color theme of the canvas. Supported values are dark and white.
	 */
	private colorTheme: ColorTheme = 'white';

	/**
	 * Initializes the canvas' 2D context and DOM reference.
	 * @param id ID of the canvas' DOM element.
	 * @param width Width of the canvas.
	 * @param height Height of the canvas.
	 * @param backgroundColor Background color of the canvas
	 */
	constructor(	
		id: string = 'snakeBoard',

		public readonly width: number = 300,
		public readonly height: number = 300,
		
		private backgroundColor: string = '#be8984',
	) {
		
		this.canvas = document.getElementById(id) as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.adjustDimensions(this.width, this.height);
	}

	/**
	 * Sets the correct width and height values for the canvas.
	 * @param width 
	 * @param height 
	 */
	public adjustDimensions(width: number, height: number): void {
		// These are html attributes, which are required for proper rendering of the canvas element.
		this.canvas.setAttribute('width', width.toString());
		this.canvas.setAttribute('height', height.toString());

		// These are the css properties for the real width and height properties.
		this.canvas.style.width = width + 'px';
		this.canvas.style.height = height + 'px';
	}

	/**
	 * Clears the canvas and removes any drawn element.
	 */
	public clear(): void {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	/**
	 * Calls the rendering function of the element that you want to draw on the canvas.
	 * @param element Element to be rendered on the canvas.
	 */
	public drawElement(element: Drawable): void {
		element.drawOnCanvas(this.ctx);
	}

	/* -- COLOR THEME LOGIC -- */
	
	private setWhiteMode(): void {
		this.backgroundColor = '#be8984';
		this.colorTheme = 'white';
	}

	private setDarkMode(): void {
		this.backgroundColor = 'black';
		this.colorTheme = 'dark';
	}

	/**
	 * Switches color themes between dark and white modes.
	 */
	public switchColorTheme(): void {
		if (this.colorTheme == 'white') {
			this.setDarkMode();
		}

		else {
			this.setWhiteMode();
		}
	}
}