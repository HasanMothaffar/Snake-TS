var Food = /** @class */ (function () {
    /**
     * Initialize a new piece of food for the snake
     * @param foodSize Size of the food tile
     * @param foodColor Fill color for the piece of food
     * @param foodBorderColor Fill color for the border of the piece of food
     * @param XLimit Horizontal boundary that the food's coordinates cannot exceed
     * @param YLimit Vertical boundary that the food's coordinates cannot exceed
     */
    function Food(foodSize, foodColor, foodBorderColor, XLimit, YLimit) {
        this.foodSize = foodSize;
        this.foodColor = foodColor;
        this.foodBorderColor = foodBorderColor;
        this.XLimit = XLimit;
        this.YLimit = YLimit;
    }
    /**
     *
     * @param context
     */
    Food.prototype.drawOnCanvas = function (context) {
        context.fillStyle = this.foodColor;
        context.strokeStyle = this.foodBorderColor;
        context.fillRect(this.x, this.y, this.foodSize, this.foodSize);
        context.strokeRect(this.x, this.y, this.foodSize, this.foodSize);
    };
    /**
     * generate coordinates for the piece of food.
     * @param {Array} tiles - array of tiles that the snake occupies
     * @returns {void}
     */
    Food.prototype.generateCoordinates = function (tiles) {
        this.x = this.randomCoordinate(0, this.XLimit - this.foodSize);
        this.y = this.randomCoordinate(0, this.YLimit - this.foodSize);
        // as long as the generated coordinates overlap with the snake's tiles, call this function again to generate another pair of coordinates
        while (this.foodCollidesWithSnake(tiles))
            this.generateCoordinates(tiles);
    };
    /**
     * Check whether the randomly generated piece of food collides with any of the snake's tiles.
     * @param tiles Snake's array of tiles
     * @returns
     */
    Food.prototype.foodCollidesWithSnake = function (tiles) {
        var _this = this;
        return tiles.some(function (tile) { return tile.x === _this.x && tile.y === _this.y; });
    };
    /**
     * Generate a random coordinate for the snake's food
     * @param min - Usually 0, which is the starting point of the canvas
     * @param max - The furthest place on the canvas upon which the piece of food can be generated
     * @returns A random number representing a coordinate. Note that this isn't an (x, y) pair. it's just a single number
     */
    Food.prototype.randomCoordinate = function (min, max) {
        return Math.round((Math.random() * (max - min) + min) / this.foodSize) * this.foodSize;
    };
    return Food;
}());
export default Food;
//# sourceMappingURL=Food.js.map