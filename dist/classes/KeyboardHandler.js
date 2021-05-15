var KeyboardHandler = /** @class */ (function () {
    /**
     * Initializes keyboard event listeners for the snake game.
     * @param snakeGame Snake game instance to attach the event listeners to.
     */
    function KeyboardHandler(snakeGame) {
        this.snakeGame = snakeGame;
        this.gameHasStarted = false;
    }
    KeyboardHandler.prototype.handleEvent = function (event) {
        var pressedKeyCode = event.code;
        if (pressedKeyCode === 'Space') {
            // Start the game
            if (this.gameHasStarted === false) {
                this.snakeGame.start();
                this.gameHasStarted = true;
            }
            // Pause/Resume the game if it has already started
            else if (this.snakeGame.isGameRunning()) {
                this.snakeGame.pause();
            }
            else {
                this.snakeGame.resume();
            }
        }
        else if (pressedKeyCode === 'KeyR') {
            // restart game
            this.snakeGame.restart();
            this.gameHasStarted = false;
        }
        else {
            this.snakeGame.snake.changeDirection(event);
        }
    };
    return KeyboardHandler;
}());
export default KeyboardHandler;
//# sourceMappingURL=KeyboardHandler.js.map