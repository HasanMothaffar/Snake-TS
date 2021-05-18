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
	 * 
	 * @param id ID of the canvas' DOM element.
	 * @param width Width of the canvas.
	 * @param height Height of the canvas.
	 * @param backgroundColor Background color of the canvas
	 * @param borderColor Border color of the canvas
	 */
	constructor(	
		id: string = 'canvas',

		public readonly width: number = 300,
		public readonly height: number = 300,
		
		private backgroundColor: string = '#be8984',
		private borderColor: string = 'silver'
	) {

		// Initialize the canvas' 2D context
		this.canvas = document.getElementById(id) as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.adjustDimensions();
	}

	/**
	 * Sets the correct width and height values for the canvas.
	 */
	private adjustDimensions(): void {
		// These are html attributes, which are required for proper rendering of the canvas element.
		this.canvas.setAttribute('width', this.width.toString());
		this.canvas.setAttribute('height', this.height.toString());

		// These are the css properties for the real width and height properties.
		this.canvas.style.width = this.width + 'px';
		this.canvas.style.height = this.height + 'px';
	}

	/**
	 * Clears the canvas and removes any drawn element.
	 */
	public clear(): void {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.strokeStyle = this.borderColor;

		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.strokeRect(0, 0, this.width, this.height);
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
		this.backgroundColor = '#846A6A';
		this.borderColor = 'silver';
		this.colorTheme = 'white';
	}

	private setDarkMode(): void {
		this.backgroundColor = 'black';
		this.borderColor = 'yellow';
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