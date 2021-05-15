import { Drawable } from "../models/Drawable.js";

export default class Canvas {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private colorTheme: string = 'white';

	constructor(	
		id: string = 'canvas',

		public readonly width: number = 300,
		public readonly height: number = 300,
		
		private backgroundColor: string = '#846A6A',
		private borderColor: string = 'silver'
	) {
		this.canvas = document.getElementById(id) as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.adjustDimensions();
	}

	/**
	 * Sets the correct width and height values for the canvas.
	 */
	private adjustDimensions() {
		// these are html attributes. required for proper rendering of the canvas element
		this.canvas.setAttribute('width', this.width.toString());
		this.canvas.setAttribute('height', this.height.toString());

		// these are css properties for the real width and height properties
		this.canvas.style.width = this.width + 'px';
		this.canvas.style.height = this.height + 'px';
	}

	/**
	 * Clears the canvas.
	 */
	public clear() {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.strokeStyle = this.borderColor;

		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.strokeRect(0, 0, this.width, this.height);
	}

	/**
	 * Calls the element's own rendering function.
	 * @param element Element to be rendered on the canvas.
	 */
	public drawElement(element: Drawable) {
		element.drawOnCanvas(this.ctx);
	}

	/* -- COLOR THEME LOGIC -- */
	
	private setWhiteMode() {
		this.backgroundColor = '#846A6A';
		this.borderColor = 'silver';
		this.colorTheme = 'white';
	}

	private setDarkMode() {
		this.backgroundColor = 'black';
		this.borderColor = 'yellow';
		this.colorTheme = 'dark';
	}

	public switchColorTheme() {
		if (this.colorTheme == 'white') {
			this.setDarkMode();
		}

		else {
			this.setWhiteMode();
		}
	}
}