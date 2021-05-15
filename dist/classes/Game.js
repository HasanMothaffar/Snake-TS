import Food from "./Food.js";
var Game = /** @class */ (function () {
    function Game(snake, canvas) {
        this.snake = snake;
        this.canvas = canvas;
        this.gameSpeed = 100;
        this.food = new Food(this.snake.tileSize, 'lightgreen', 'yellow', this.canvas.width, this.canvas.height);
        this.initialRender();
    }
    Game.prototype.isGameRunning = function () {
        return this.running;
    };
    /**
     * checks if the game should continue or not
     * @returns {boolean} whether the snake hit any of the boundaries or ate itself
     */
    Game.prototype.hasSnakeGameEnded = function () {
        // the snake can only eat one of its own tiles if its length is > 4
        var head = this.snake.snakeHead;
        for (var i = 4; i < this.snake.tiles.length; i++) {
            // checking if the snake's head collides with any of its other tiles
            if (this.snake.tiles[i].x === head.x && this.snake.tiles[i].y === head.y) {
                return true;
            }
        }
        var hitLeftWall = head.x < 0;
        var hitRightWall = head.x > this.canvas.width - this.snake.tileSize; //the tile with the coordinate 'this.canvas.width - this.snake.tileSize' is the last tile in the canvas. therefore, here we're checking if the head of the snake is past this tile
        var hitToptWall = head.y < 0;
        var hitBottomWall = head.y > this.canvas.height - this.snake.tileSize;
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    };
    Game.prototype.initialRender = function () {
        this.canvas.clear();
        this.canvas.drawElement(this.snake);
    };
    Game.prototype.start = function (resume) {
        if (resume === void 0) { resume = false; }
        if (!this.running) {
            this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
            this.food.generateCoordinates(this.snake.tiles);
            this.running = true;
        }
    };
    Game.prototype.resume = function () {
        if (!this.running) {
            this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
            this.running = true;
        }
    };
    Game.prototype.pause = function () {
        clearInterval(this.gameInterval);
        this.running = false;
    };
    Game.prototype.restart = function () {
        this.snake.resetCoordinates();
        /*
            It's necessary that the food coordinates be generated
            only after the snake's coordinates have been reset,
            because the generateCoordinates function depends on the
            snake's tiles array.
        */
        this.food.generateCoordinates(this.snake.tiles);
        this.initialRender();
    };
    Game.prototype.renderGame = function () {
        this.canvas.clear();
        this.canvas.drawElement(this.snake);
        this.canvas.drawElement(this.food);
    };
    return Game;
}());
export default Game;
//# sourceMappingURL=Game.js.map