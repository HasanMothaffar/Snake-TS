var Canvas = /** @class */ (function () {
    function Canvas(id, width, height, backgroundColor, borderColor) {
        if (id === void 0) { id = 'canvas'; }
        if (width === void 0) { width = 300; }
        if (height === void 0) { height = 300; }
        if (backgroundColor === void 0) { backgroundColor = '#846A6A'; }
        if (borderColor === void 0) { borderColor = 'silver'; }
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.colorTheme = 'white';
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.adjustDimensions();
    }
    /**
     * Sets the correct width and height values for the canvas.
     */
    Canvas.prototype.adjustDimensions = function () {
        // these are html attributes. required for proper rendering of the canvas element
        this.canvas.setAttribute('width', this.width.toString());
        this.canvas.setAttribute('height', this.height.toString());
        // these are css properties for the real width and height properties
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
    };
    /**
     * Clears the canvas.
     */
    Canvas.prototype.clear = function () {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeRect(0, 0, this.width, this.height);
    };
    /**
     * Calls the element's own rendering function.
     * @param element Element to be rendered on the canvas.
     */
    Canvas.prototype.drawElement = function (element) {
        element.drawOnCanvas(this.ctx);
    };
    /* -- COLOR THEME LOGIC -- */
    Canvas.prototype.setWhiteMode = function () {
        this.backgroundColor = '#846A6A';
        this.borderColor = 'silver';
        this.colorTheme = 'white';
    };
    Canvas.prototype.setDarkMode = function () {
        this.backgroundColor = 'black';
        this.borderColor = 'yellow';
        this.colorTheme = 'dark';
    };
    Canvas.prototype.switchColorTheme = function () {
        if (this.colorTheme == 'white') {
            this.setDarkMode();
        }
        else {
            this.setWhiteMode();
        }
    };
    return Canvas;
}());
export default Canvas;
//# sourceMappingURL=Canvas.js.map