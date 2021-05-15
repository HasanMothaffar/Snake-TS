var Snake = /** @class */ (function () {
    function Snake(tileSize, tileColor, headColor) {
        this.tileSize = tileSize;
        this.tileColor = tileColor;
        this.headColor = headColor;
        this.initialXPos = 100;
        this.initialYPos = 100;
        this.numOfStartingBlocks = 4;
        this.verticalSpeed = 0;
        this.horizontalSpeed = (-1) * this.tileSize;
        this.tiles = [];
        this.resetCoordinates();
    }
    Object.defineProperty(Snake.prototype, "snakeHead", {
        get: function () {
            return this.tiles[0];
        },
        enumerable: false,
        configurable: true
    });
    /* -- DRAWING LOGIC -- */
    Snake.prototype.drawSnakeTile = function (tile, tileIndex, parentCanvasContext) {
        parentCanvasContext.fillStyle = tileIndex === 0 ? this.headColor : this.tileColor;
        parentCanvasContext.strokeStyle = 'darkblue';
        var x = tile.x, y = tile.y;
        parentCanvasContext.fillRect(x, y, this.tileSize, this.tileSize);
        parentCanvasContext.strokeRect(x, y, this.tileSize, this.tileSize);
    };
    Snake.prototype.drawOnCanvas = function (context) {
        var _this = this;
        this.tiles.forEach(function (tile, tileIndex) {
            console.log('drawing');
            _this.drawSnakeTile(tile, tileIndex, context);
        });
    };
    Snake.prototype.move = function (food) {
        var head = {
            x: this.tiles[0].x + this.horizontalSpeed,
            y: this.tiles[0].y + this.verticalSpeed
        };
    };
    Snake.prototype.resetSpeeds = function () {
        this.horizontalSpeed = (-1) * this.tileSize;
        this.verticalSpeed = 0;
    };
    Snake.prototype.resetCoordinates = function () {
        this.resetSpeeds();
        this.tiles = [];
        for (var i = 0; i < this.numOfStartingBlocks; i++) {
            this.tiles.push({
                x: this.initialXPos,
                y: this.initialYPos
            });
            this.initialXPos += this.tileSize;
        }
    };
    /**
     * Changes the snake's direction. note that the horizontal and vertical speeds in this class represent directions
     * with negative values indicating left and downwards, and positive ones indicating right and upwards.
     * @param event
     */
    Snake.prototype.changeDirection = function (event) {
        var direction = '';
        var pressedKeyCode = event.code;
        // if (this._changingDirection) return; //used to prevent the snake from going into the reverse direction. for example, going up and then down
        // // the snake would have to wait for this function to return and for the Game loop to run again to be able to change direction
        // this._changingDirection = true;
        var goingUp = this.verticalSpeed === (-1) * this.tileSize;
        var goingDown = this.verticalSpeed === this.tileSize;
        var goingRight = this.horizontalSpeed === this.tileSize;
        var goingLeft = this.horizontalSpeed === (-1) * this.tileSize;
        if (pressedKeyCode === 'ArrowLeft' && !goingRight) {
            this.horizontalSpeed = (-1) * this.tileSize;
            this.verticalSpeed = 0;
            direction = 'left';
        }
        else if (pressedKeyCode === 'ArrowRight' && !goingLeft) {
            this.horizontalSpeed = this.tileSize;
            this.verticalSpeed = 0;
            direction = 'right';
        }
        else if (pressedKeyCode === 'ArrowUp' && !goingDown) {
            this.horizontalSpeed = 0;
            this.verticalSpeed = (-1) * this.tileSize;
            direction = 'down';
        }
        else if (pressedKeyCode === 'ArrowDown' && !goingUp) {
            this.horizontalSpeed = 0;
            this.verticalSpeed = this.tileSize;
            direction = 'up';
        }
        console.log("Changing direction to " + direction);
    };
    return Snake;
}());
export default Snake;
// TODO: add the ability to change the numOfStartingBlocks and initialX and Y values.
//# sourceMappingURL=Snake.js.map