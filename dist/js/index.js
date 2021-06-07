/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/classes/Canvas.ts":
/*!**********************************!*\
  !*** ./src/ts/classes/Canvas.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Canvas)
/* harmony export */ });
class Canvas {
    /**
     * Initializes the canvas' 2D context and DOM reference.
     * @param id ID of the canvas' DOM element.
     * @param width Width of the canvas.
     * @param height Height of the canvas.
     * @param backgroundColor Background color of the canvas
     */
    constructor(id = 'snakeBoard', width = 300, height = 300, backgroundColor = '#be8984') {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        /**
         * The color theme of the canvas. Supported values are dark and white.
         */
        this.colorTheme = 'white';
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.adjustDimensions(this.width, this.height);
    }
    /**
     * Sets the correct width and height values for the canvas.
     * @param width Width of the canvas.
     * @param height Height of the canvas.
     */
    adjustDimensions(width, height) {
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
    clear() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    /**
     * Calls the rendering function of the element that you want to draw on the canvas.
     * @param element Element to be rendered on the canvas.
     */
    drawElement(element) {
        element.drawOnCanvas(this.ctx);
    }
    /* -- COLOR THEME LOGIC -- */
    setWhiteMode() {
        this.backgroundColor = '#be8984';
        this.colorTheme = 'white';
    }
    setDarkMode() {
        this.backgroundColor = 'black';
        this.colorTheme = 'dark';
    }
    /**
     * Updates the colors of the canvas to match the new theme
     */
    switchColorTheme() {
        if (this.colorTheme == 'white') {
            this.setDarkMode();
        }
        else {
            this.setWhiteMode();
        }
    }
}


/***/ }),

/***/ "./src/ts/classes/Food.ts":
/*!********************************!*\
  !*** ./src/ts/classes/Food.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Food)
/* harmony export */ });
class Food {
    /**
     * Initializes a new piece of food for the snake.
     * @param foodSize Size of the food tile.
     * @param foodColor Fill color for the piece of food.
     * @param foodBorderColor Fill color for the border of the piece of food.
     * @param XLimit Horizontal boundary that the food's coordinates cannot exceed.
     * @param YLimit Vertical boundary that the food's coordinates cannot exceed.
     */
    constructor(foodSize, foodColor, foodBorderColor, XLimit, YLimit) {
        this.foodSize = foodSize;
        this.foodColor = foodColor;
        this.foodBorderColor = foodBorderColor;
        this.XLimit = XLimit;
        this.YLimit = YLimit;
    }
    /* -- Getters that are used in the Snake.ts class -- */
    /**
     * Returns the food's X coordinate.
     */
    get xCoordinate() {
        return this.x;
    }
    /**
     * Returns the food's Y coordinate.
     */
    get yCoordinate() {
        return this.y;
    }
    /**
     * Draws the piece of food on the parent canvas.
     * @param context Canvas upon which to draw the piece of food.
     */
    drawOnCanvas(context) {
        context.fillStyle = this.foodColor;
        context.strokeStyle = this.foodBorderColor;
        context.fillRect(this.x, this.y, this.foodSize, this.foodSize);
        context.strokeRect(this.x, this.y, this.foodSize, this.foodSize);
    }
    /**
     * Generates coordinates for the piece of food.
     * @param tiles Array of tiles that the snake occupies.
     */
    generateCoordinates(tiles) {
        this.x = this.getRandomCoordinate(0, this.XLimit - this.foodSize);
        this.y = this.getRandomCoordinate(0, this.YLimit - this.foodSize);
        // As long as the generated coordinates overlap with the snake's tiles, call this function again to generate another pair of coordinates.
        while (this.foodCollidesWithSnake(tiles))
            this.generateCoordinates(tiles);
    }
    /**
     * Checks whether the randomly generated piece of food collides with any of the snake's tiles.
     * @param tiles Snake's array of tiles.
     * @returns
     */
    foodCollidesWithSnake(tiles) {
        return tiles.some(tile => tile.x === this.x && tile.y === this.y);
    }
    /**
     * Generates a random coordinate for the piece of food.
     * @param min Usually 0, which is the starting point of the canvas.
     * @param max The furthest point on the canvas upon which the piece of food can be generated.
     * @returns A random number representing a coordinate. Note that this isn't an (x, y) pair. it's just a single number.
     */
    getRandomCoordinate(min, max) {
        return Math.round((Math.random() * (max - min) + min) / this.foodSize) * this.foodSize;
    }
}


/***/ }),

/***/ "./src/ts/classes/Game.ts":
/*!********************************!*\
  !*** ./src/ts/classes/Game.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Food__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Food */ "./src/ts/classes/Food.ts");

class Game {
    /**
     * Initializes a new piece of food and renders a static snake on the game's canvas.
     * @param snake The game's snake.
     * @param canvas The game's canvas.
     */
    constructor(snake, canvas) {
        this.snake = snake;
        this.canvas = canvas;
        /**
         * The game loop's speed, in milliseconds.
         */
        this.gameSpeed = 300;
        this.food = new _Food__WEBPACK_IMPORTED_MODULE_0__.default(this.snake.tileSize, 'lightgreen', 'yellow', this.canvas.width, this.canvas.height);
        this.initialRender();
    }
    /**
     * Checks if the game should continue or not.
     *
     * The game stops whenever the snake hits any of the canvas' boundaries or eats itself.
     */
    hasSnakeGameEnded() {
        const head = this.snake.snakeHead;
        const context = this;
        return snakeAteItself(context) || snakeHitBoundaries(context);
        function snakeAteItself(context) {
            // The snake can only eat one of its own tiles if its length is > 4
            for (let i = 4; i < context.snake.tiles.length; i++) {
                // Checking if the snake's head collides with any of its other tiles
                if (context.snake.tiles[i].x === head.x && context.snake.tiles[i].y === head.y) {
                    return true;
                }
            }
            return false;
        }
        function snakeHitBoundaries(context) {
            // The tile with the coordinate 'context.canvas.width - context.snake.tileSize' is the last tile in the canvas.
            const hitLeftWall = head.x < 0;
            const hitRightWall = head.x > context.canvas.width - context.snake.tileSize;
            const hitToptWall = head.y < 0;
            const hitBottomWall = head.y > context.canvas.height - context.snake.tileSize;
            return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
        }
    }
    /**
     * Dispatches a 'reset-score' event to reset the player's score.
     *
     * The listener for this event is in the ScoreHandler class.
     */
    dispatchResetScoreEvent() {
        document.dispatchEvent(new Event('reset-score'));
    }
    /**
     * Renders a static snake on the canvas.
     */
    initialRender() {
        this.canvas.clear();
        this.canvas.drawElement(this.snake);
    }
    /**
     * Moves the snake and draws its tiles and the piece of food.
     */
    renderGame() {
        if (this.hasSnakeGameEnded()) {
            clearInterval(this.gameInterval);
            this.running = false;
            this.changeGameState('You died :( Press "R" to restart the game.');
            return;
        }
        this.canvas.clear();
        this.snake.move(this.food);
        this.canvas.drawElement(this.snake);
        this.canvas.drawElement(this.food);
    }
    /**
     * Starts the game.
     */
    start() {
        if (!this.running) {
            this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
            this.food.generateCoordinates(this.snake.tiles);
            this.running = true;
            this.changeGameState('');
        }
    }
    /**
     * Pauses the game.
     */
    pause() {
        clearInterval(this.gameInterval);
        this.running = false;
        this.changeGameState('Paused...');
    }
    /**
     * Resumes a paused game.
     */
    resume() {
        if (!this.running) {
            this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
            this.running = true;
            this.changeGameState('');
        }
    }
    /**
     * Restarts the game.
     */
    restart() {
        this.snake.resetCoordinates();
        this.dispatchResetScoreEvent();
        this.changeGameState('');
        /*
            It's necessary that the food coordinates be generated
            only after the snake's coordinates have been reset,
            because the generateCoordinates function depends on the
            snake's tiles array.
        */
        this.food.generateCoordinates(this.snake.tiles);
        this.initialRender();
    }
    /**
     * Returns whether the game is running or not.
     */
    isGameRunning() {
        return this.running;
    }
    /**
     * Switches color themes between dark and white modes.
     */
    switchColorTheme() {
        document.documentElement.classList.toggle('dark');
        this.canvas.switchColorTheme();
        // Updates the canvas with new colors and redraws all elements on it
        this.canvas.clear();
        this.canvas.drawElement(this.snake);
        this.canvas.drawElement(this.food);
    }
    /**
     * Changes the game's difficulty by increasing the main loop's speed.
     * @param difficulty The new difficulty (new loop's speed).
     */
    changeDifficulty(difficulty) {
        this.gameSpeed = difficulty;
        /*
            Without checking for the running property, the game would
            immediately run after changing the difficulty, even if it were paused
            in the first place.
        */
        if (this.isGameRunning()) {
            clearInterval(this.gameInterval);
            this.gameInterval = setInterval(this.renderGame.bind(this), this.gameSpeed);
        }
    }
    /**
     * Changes the game state to indicate whether it's running or paused.
     * @param state Next game state.
     */
    changeGameState(state) {
        const gameStateDiv = document.querySelector('.game-state');
        gameStateDiv.innerHTML = state;
    }
}


/***/ }),

/***/ "./src/ts/classes/Snake.ts":
/*!*********************************!*\
  !*** ./src/ts/classes/Snake.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Snake)
/* harmony export */ });
class Snake {
    /**
     * Initializes a new snake and adjusts its coordinates.
     * @param tileSize The snake's tile size in pixels.
     * @param tileColor The color of normal tiles.
     * @param headColor The color of the first tile (the head).
     */
    constructor(tileSize, tileColor, headColor) {
        this.tileSize = tileSize;
        this.tileColor = tileColor;
        this.headColor = headColor;
        /**
         * The initial X coordinate for the first tile of the snake.
         */
        this.initialXPos = 100;
        /**
         * The initial Y coordinate for the first tile of the snake.
         */
        this.initialYPos = 100;
        /**
         * The number of starting tiles in the snake's array.
         */
        this.numOfStartingBlocks = 4;
        /**
         * Indicates whether the snake is going up or down.
         */
        this.verticalSpeed = 0;
        /**
         * Indicates whether the snake is going left or right.
         */
        this.horizontalSpeed = (-1) * this.tileSize;
        /**
         * The snake's tiles' array.
         */
        this._tiles = [];
        this.resetCoordinates();
    }
    /**
     * Returns the snake's tiles' array.
     */
    get tiles() {
        return this._tiles;
    }
    /**
     * Returns the snake's head tile.
     */
    get snakeHead() {
        return this.tiles[0];
    }
    /**
     * Returns whether the snake has eaten a piece of food or not.
     * @param newHead New head tile after the snake moves.
     * @param food The current piece of food on the canvas.
     */
    hasSnakeEatenFood(newHead, food) {
        return newHead.x === food.xCoordinate && newHead.y === food.yCoordinate;
    }
    /**
     * Dispatches a 'food-eaten' event in order for the score to increase.
     *
     * The listener for this event is in the ScoreHandler class.
     */
    dispatchFoodEatenEvent() {
        document.dispatchEvent(new Event('food-eaten'));
    }
    /**
     * Draws an individual snake tile on the canvas.
     * @param tile The snake tile to be drawn.
     * @param tileIndex The index of the tile to be drawn (useful to know if it's the head tile).
     * @param parentCanvasContext The 2D context of the canvas upon which the tile will be drawn.
     */
    drawSnakeTile(tile, tileIndex, parentCanvasContext) {
        parentCanvasContext.fillStyle = tileIndex === 0 ? this.headColor : this.tileColor;
        parentCanvasContext.strokeStyle = 'darkblue';
        const { x, y } = tile;
        parentCanvasContext.fillRect(x, y, this.tileSize, this.tileSize);
        parentCanvasContext.strokeRect(x, y, this.tileSize, this.tileSize);
    }
    /**
     * Draws the whole snake on the canvas.
     * @param context The 2D context of the canvas upon which the tile will be drawn.
     */
    drawOnCanvas(context) {
        this.tiles.forEach((tile, tileIndex) => {
            this.drawSnakeTile(tile, tileIndex, context);
        });
    }
    /**
     * Moves the tiles of the snake.
     * @param food The piece of food that the snake will eat.
     */
    move(food) {
        const newHead = {
            x: this.tiles[0].x + this.horizontalSpeed,
            y: this.tiles[0].y + this.verticalSpeed
        };
        this.tiles.unshift(newHead);
        // Generate a new piece of food and increase score if the snake has eaten the food
        if (this.hasSnakeEatenFood(newHead, food)) {
            food.generateCoordinates(this.tiles);
            this.dispatchFoodEatenEvent();
        }
        // The snake moves normally in this case
        else {
            this.tiles.pop();
        }
    }
    /**
     * Resets the direction of the snake.
     */
    resetDirection() {
        this.horizontalSpeed = (-1) * this.tileSize;
        this.verticalSpeed = 0;
    }
    /**
     * Resets the current tiles array and creates a new one with new coordinates.
     */
    resetCoordinates() {
        this.resetDirection();
        this._tiles = [];
        let firstXPos = this.initialXPos;
        let firstYPos = this.initialYPos;
        for (let i = 0; i < this.numOfStartingBlocks; i++) {
            this.tiles.push({
                x: firstXPos,
                y: firstYPos
            });
            firstXPos += this.tileSize;
        }
    }
    /**
     * Changes the snake's direction. Note that the horizontal and vertical speeds in this class represent directions
     * with negative values indicating left and downwards, and positive ones indicating right and upwards.
     * @param pressedKeyCode The code of the pressed key.
     */
    changeDirection(pressedKeyCode) {
        // if (this._changingDirection) return; //used to prevent the snake from going into the reverse direction. for example, going up and then down
        // the snake would have to wait for this function to return and for the Game loop to run again to be able to change direction
        // this._changingDirection = true;
        const goingUp = this.verticalSpeed === (-1) * this.tileSize;
        const goingDown = this.verticalSpeed === this.tileSize;
        const goingRight = this.horizontalSpeed === this.tileSize;
        const goingLeft = this.horizontalSpeed === (-1) * this.tileSize;
        if (pressedKeyCode === 'ArrowLeft' && !goingRight) {
            this.horizontalSpeed = (-1) * this.tileSize;
            this.verticalSpeed = 0;
        }
        else if (pressedKeyCode === 'ArrowRight' && !goingLeft) {
            this.horizontalSpeed = this.tileSize;
            this.verticalSpeed = 0;
        }
        else if (pressedKeyCode === 'ArrowUp' && !goingDown) {
            this.horizontalSpeed = 0;
            this.verticalSpeed = (-1) * this.tileSize;
        }
        else if (pressedKeyCode === 'ArrowDown' && !goingUp) {
            this.horizontalSpeed = 0;
            this.verticalSpeed = this.tileSize;
        }
    }
}


/***/ }),

/***/ "./src/ts/eventHandlers/KeyboardHandler.ts":
/*!*************************************************!*\
  !*** ./src/ts/eventHandlers/KeyboardHandler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KeyboardHandler)
/* harmony export */ });
class KeyboardHandler {
    /**
     * Initializes keyboard event listeners for the snake game.
     * @param snakeGame Snake game instance to attach the event listeners to.
     */
    constructor(snakeGame) {
        this.snakeGame = snakeGame;
        /**
         * A flag that indicates whether the game has already started.
         * Useful for handling the pause/resume game states.
         */
        this.gameHasStarted = false;
        document.addEventListener('keydown', this);
    }
    /**
     * Handles game states by listening to the keydown event.
     * @param event The keyboard event that gets fired.
     */
    handleEvent(event) {
        const pressedKeyCode = event.code;
        if (pressedKeyCode === 'Space') {
            this.handleSpacebar();
        }
        else if (pressedKeyCode === 'KeyR') {
            this.handleRKey();
        }
        // Arrow keys are pressed in this case
        else {
            this.snakeGame.snake.changeDirection(pressedKeyCode);
        }
    }
    /**
     * Starts/Pauses/Resumes the game.
     * @param pressedKeyCode Code for the pressed key (space).
     */
    handleSpacebar() {
        /*
            I want to make toggling the dark mode switch possible through the spacebar key,
            but I don't want the game to start/be paused when users switch this button using the spacebar. They
            would have to click something else on the screen to be able to start/pause the game.
        */
        if (isDarkModeInputFocused())
            return;
        // Start the game if it hasn't been started yet
        if (this.gameHasStarted === false) {
            this.snakeGame.start();
            this.gameHasStarted = true;
        }
        // Pause the game if it has already started and is currently running
        else if (this.snakeGame.isGameRunning()) {
            this.snakeGame.pause();
        }
        // The game is paused in this case, so resume it
        else {
            this.snakeGame.resume();
        }
    }
    /**
     * Restarts the game.
     * @param pressedKeyCode Code for the pressed key (R).
     */
    handleRKey() {
        this.snakeGame.restart();
        this.gameHasStarted = false;
    }
}
/**
 * Returns whether the dark mode switch button is focused or not.
 */
function isDarkModeInputFocused() {
    const darkModeInput = document.getElementById('dark_mode_input');
    return darkModeInput === document.activeElement;
}


/***/ }),

/***/ "./src/ts/eventHandlers/OptionsHandler.ts":
/*!************************************************!*\
  !*** ./src/ts/eventHandlers/OptionsHandler.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DifficultyHanlder)
/* harmony export */ });
class DifficultyHanlder {
    /**
     * Initializes options event listeners for the snake game.
     * @param snakeGame Snake game instance to attach the event listeners to.
     */
    constructor(snakeGame) {
        this.snakeGame = snakeGame;
        /**
         * The modal that contains the options of the game.
         */
        this.optionsModal = document.querySelector('.options');
        /**
         * The button that opens the options modal.
         */
        this.optionsModalOpenButton = document.querySelector('.btn--open-modal');
        /**
         * The button that closes the options modal. It's placed inside the modal itself.
         */
        this.optionsModalCloseButton = document.querySelector('.btn--close-modal');
        /**
         * The theme toggle button.
         */
        this.darkModeInput = document.getElementById('dark_mode_input');
        /**
         * The select tag that changes the game's difficulty.
         */
        this.difficultyController = document.getElementById('game-difficulty');
        // Options modal close and open buttons
        this.optionsModalOpenButton.addEventListener('click', (event) => this.openOptionsModal());
        this.optionsModalCloseButton.addEventListener('click', (event) => this.closeOptionsModal());
        // Theme change button
        this.darkModeInput.addEventListener('change', (event) => this.changeTheme());
        // Difficulty controller
        this.difficultyController.addEventListener('change', (event) => this.changeDifficulty(event));
    }
    ;
    /**
     * Opens the options modal, which causes the game to pause.
     */
    openOptionsModal() {
        this.optionsModal.classList.add('open');
        this.snakeGame.pause();
    }
    /**
     * Closes the options modal.
     */
    closeOptionsModal() {
        this.optionsModal.classList.remove('open');
    }
    /**
     * Changes the game's theme.
     */
    changeTheme() {
        this.snakeGame.switchColorTheme();
    }
    /**
     * Calls the snake game's changeDifficulty method.
     * @param event The difficulty controller's change event.
     */
    changeDifficulty(event) {
        const newDifficulty = this.getNewDifficulty();
        this.snakeGame.changeDifficulty(newDifficulty);
        this.difficultyController.blur();
    }
    /**
     * Returns the difficulty that the user specifies.
     *
     * Note that difficulty is a number that indicates the game loop's speed in milliseconds.
     */
    getNewDifficulty() {
        const selectedDifficultyIndex = this.difficultyController.selectedIndex;
        const difficulty = this.difficultyController.options[selectedDifficultyIndex].value;
        return parseInt(difficulty);
    }
}


/***/ }),

/***/ "./src/ts/eventHandlers/ScoreHandler.ts":
/*!**********************************************!*\
  !*** ./src/ts/eventHandlers/ScoreHandler.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScoreHandler)
/* harmony export */ });
class ScoreHandler {
    /**
     * Initializes score event listeners for the snake game.
     * @param snakeGame Snake game instance to attach the event listeners to.
     */
    constructor(snakeGame) {
        this.snakeGame = snakeGame;
        /**
         * The sound effect to play when the snake eats a piece of food.
         */
        this.foodEatenAudio = new Audio('/dist/sounds/eat-food.wav');
        this.scoreSpan = document.getElementById('score');
        this.scoreAnimationSpan = document.querySelector('.score-animation');
        document.addEventListener('food-eaten', () => this.increaseScore());
        document.addEventListener('reset-score', () => this.resetScore());
    }
    /**
     * Increases the player's score by 1.
     */
    increaseScore() {
        let currentScore = this.scoreSpan.innerHTML;
        let newScore = parseInt(currentScore) + 1;
        this.scoreSpan.innerHTML = newScore.toString();
        this.playScoreAnimation();
        this.foodEatenAudio.play();
    }
    /**
     * Resets the player's score to 0.
     */
    resetScore() {
        this.scoreSpan.innerHTML = '0';
    }
    /**
     * Plays the +1 score animation.
     */
    playScoreAnimation() {
        this.scoreAnimationSpan.classList.add('animated');
        // Remove the animation class after the animation ends.
        this.scoreAnimationSpan.addEventListener('animationend', () => {
            this.scoreAnimationSpan.classList.remove('animated');
        });
    }
}


/***/ }),

/***/ "./src/ts/eventHandlers/TouchHandler.ts":
/*!**********************************************!*\
  !*** ./src/ts/eventHandlers/TouchHandler.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TouchHandler)
/* harmony export */ });
class TouchHandler {
    /**
     * Initializes touch event listeners for the snake game.
     * @param snakeGame Snake game instance to attach the event listeners to.
     */
    constructor(snakeGame) {
        this.snakeGame = snakeGame;
        /**
         * The div that contains control arrows for mobile screens.
         */
        this.mobileArrowsDiv = document.getElementById('mobile-arrows');
        /**
         * The pause and start buttons on mobile screens.
         */
        this.gameControlButtons = document.querySelectorAll('.game-controls-container button');
        this.mobileArrowsDiv.addEventListener('click', (event) => this.handleArrowsEvent(event));
        this.gameControlButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const eventCode = event.target.dataset.toggle;
                this.handleGameControlButtons(eventCode);
            });
        });
    }
    handleArrowsEvent(event) {
        // Event target might be an svg element, but I want the parent button element instead.
        const eventTarget = event.target.closest('button');
        if (eventTarget !== null && eventTarget.dataset.code) {
            this.snakeGame.snake.changeDirection(eventTarget.dataset.code);
        }
    }
    handleGameControlButtons(buttonCode) {
        let code;
        if (buttonCode === 'start')
            code = 'Space';
        else if (buttonCode === 'restart')
            code = 'KeyR';
        document.dispatchEvent(new KeyboardEvent('keydown', {
            code: code
        }));
    }
}


/***/ }),

/***/ "./src/ts/eventHandlers/index.ts":
/*!***************************************!*\
  !*** ./src/ts/eventHandlers/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerEventHandlers": () => (/* binding */ registerEventHandlers)
/* harmony export */ });
/* harmony import */ var _KeyboardHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeyboardHandler */ "./src/ts/eventHandlers/KeyboardHandler.ts");
/* harmony import */ var _TouchHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TouchHandler */ "./src/ts/eventHandlers/TouchHandler.ts");
/* harmony import */ var _ScoreHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScoreHandler */ "./src/ts/eventHandlers/ScoreHandler.ts");
/* harmony import */ var _OptionsHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OptionsHandler */ "./src/ts/eventHandlers/OptionsHandler.ts");




/**
 * Registers touch, keyboard, theme, and score event listeners for the `snakeGame` parameter.
 * @param snakeGame The snake game instance to add event listeners to.
 */
function registerEventHandlers(snakeGame) {
    /* -- Controls -- */
    const keyboardHandler = new _KeyboardHandler__WEBPACK_IMPORTED_MODULE_0__.default(snakeGame);
    const touchHandler = new _TouchHandler__WEBPACK_IMPORTED_MODULE_1__.default(snakeGame);
    /* -- Score -- */
    const scoreHandler = new _ScoreHandler__WEBPACK_IMPORTED_MODULE_2__.default(snakeGame);
    /* -- Options -- */
    const optionsHandler = new _OptionsHandler__WEBPACK_IMPORTED_MODULE_3__.default(snakeGame);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Game */ "./src/ts/classes/Game.ts");
/* harmony import */ var _classes_Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Snake */ "./src/ts/classes/Snake.ts");
/* harmony import */ var _classes_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Canvas */ "./src/ts/classes/Canvas.ts");
/* harmony import */ var _eventHandlers_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventHandlers/index */ "./src/ts/eventHandlers/index.ts");




// Reduce the dimensions of the canvas on smaller screens. This only happens when the game is loaded.
const mediaQuery = matchMedia('(max-width: 576px)');
let canvasWidth;
let canvasHeight;
if (mediaQuery.matches) {
    canvasWidth = canvasHeight = window.innerWidth - 50;
}
else {
    canvasWidth = canvasHeight = 500;
}
const canvas = new _classes_Canvas__WEBPACK_IMPORTED_MODULE_2__.default('snakeBoard', canvasWidth, canvasHeight);
const snake = new _classes_Snake__WEBPACK_IMPORTED_MODULE_1__.default(20, 'darkgreen', 'yellow');
const snakeGame = new _classes_Game__WEBPACK_IMPORTED_MODULE_0__.default(snake, canvas);
(0,_eventHandlers_index__WEBPACK_IMPORTED_MODULE_3__.registerEventHandlers)(snakeGame);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90X3NuYWtlLy4vc3JjL3RzL2NsYXNzZXMvQ2FudmFzLnRzIiwid2VicGFjazovL3Rfc25ha2UvLi9zcmMvdHMvY2xhc3Nlcy9Gb29kLnRzIiwid2VicGFjazovL3Rfc25ha2UvLi9zcmMvdHMvY2xhc3Nlcy9HYW1lLnRzIiwid2VicGFjazovL3Rfc25ha2UvLi9zcmMvdHMvY2xhc3Nlcy9TbmFrZS50cyIsIndlYnBhY2s6Ly90X3NuYWtlLy4vc3JjL3RzL2V2ZW50SGFuZGxlcnMvS2V5Ym9hcmRIYW5kbGVyLnRzIiwid2VicGFjazovL3Rfc25ha2UvLi9zcmMvdHMvZXZlbnRIYW5kbGVycy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly90X3NuYWtlLy4vc3JjL3RzL2V2ZW50SGFuZGxlcnMvU2NvcmVIYW5kbGVyLnRzIiwid2VicGFjazovL3Rfc25ha2UvLi9zcmMvdHMvZXZlbnRIYW5kbGVycy9Ub3VjaEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vdF9zbmFrZS8uL3NyYy90cy9ldmVudEhhbmRsZXJzL2luZGV4LnRzIiwid2VicGFjazovL3Rfc25ha2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdF9zbmFrZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdF9zbmFrZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rfc25ha2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90X3NuYWtlLy4vc3JjL3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRWUsTUFBTSxNQUFNO0lBZ0IxQjs7Ozs7O09BTUc7SUFDSCxZQUNDLEtBQWEsWUFBWSxFQUVULFFBQWdCLEdBQUcsRUFDbkIsU0FBaUIsR0FBRyxFQUU1QixrQkFBMEIsU0FBUztRQUgz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ZW1lIH0gZnJvbSBcIi4uL21vZGVscy9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcclxuXHQvKipcclxuXHQgKiBUaGUgY2FudmFzJyBET00gZWxlbWVudCByZWZlcmVuY2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYWN0dWFsIDJEIGNvbnRleHQgdXBvbiB3aGljaCB3ZSBkcmF3IHRoaW5ncyBpbiB0aGUgY2FudmFzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjb2xvciB0aGVtZSBvZiB0aGUgY2FudmFzLiBTdXBwb3J0ZWQgdmFsdWVzIGFyZSBkYXJrIGFuZCB3aGl0ZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIGNvbG9yVGhlbWU6IENvbG9yVGhlbWUgPSAnd2hpdGUnO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0aGUgY2FudmFzJyAyRCBjb250ZXh0IGFuZCBET00gcmVmZXJlbmNlLlxyXG5cdCAqIEBwYXJhbSBpZCBJRCBvZiB0aGUgY2FudmFzJyBET00gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gd2lkdGggV2lkdGggb2YgdGhlIGNhbnZhcy5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0IEhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG5cdCAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3IgQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgY2FudmFzXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoXHRcclxuXHRcdGlkOiBzdHJpbmcgPSAnc25ha2VCb2FyZCcsXHJcblxyXG5cdFx0cHVibGljIHJlYWRvbmx5IHdpZHRoOiBudW1iZXIgPSAzMDAsXHJcblx0XHRwdWJsaWMgcmVhZG9ubHkgaGVpZ2h0OiBudW1iZXIgPSAzMDAsXHJcblx0XHRcclxuXHRcdHByaXZhdGUgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSAnI2JlODk4NCcsXHJcblx0KSB7XHJcblx0XHRcclxuXHRcdHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5cdFx0dGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcblx0XHR0aGlzLmFkanVzdERpbWVuc2lvbnModGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgY29ycmVjdCB3aWR0aCBhbmQgaGVpZ2h0IHZhbHVlcyBmb3IgdGhlIGNhbnZhcy5cclxuXHQgKiBAcGFyYW0gd2lkdGggV2lkdGggb2YgdGhlIGNhbnZhcy5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0IEhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGp1c3REaW1lbnNpb25zKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHQvLyBUaGVzZSBhcmUgaHRtbCBhdHRyaWJ1dGVzLCB3aGljaCBhcmUgcmVxdWlyZWQgZm9yIHByb3BlciByZW5kZXJpbmcgb2YgdGhlIGNhbnZhcyBlbGVtZW50LlxyXG5cdFx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoLnRvU3RyaW5nKCkpO1xyXG5cdFx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQudG9TdHJpbmcoKSk7XHJcblxyXG5cdFx0Ly8gVGhlc2UgYXJlIHRoZSBjc3MgcHJvcGVydGllcyBmb3IgdGhlIHJlYWwgd2lkdGggYW5kIGhlaWdodCBwcm9wZXJ0aWVzLlxyXG5cdFx0dGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XHJcblx0XHR0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSBjYW52YXMgYW5kIHJlbW92ZXMgYW55IGRyYXduIGVsZW1lbnQuXHJcblx0ICovXHJcblx0cHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHR0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxscyB0aGUgcmVuZGVyaW5nIGZ1bmN0aW9uIG9mIHRoZSBlbGVtZW50IHRoYXQgeW91IHdhbnQgdG8gZHJhdyBvbiB0aGUgY2FudmFzLlxyXG5cdCAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZHJhd0VsZW1lbnQoZWxlbWVudDogRHJhd2FibGUpOiB2b2lkIHtcclxuXHRcdGVsZW1lbnQuZHJhd09uQ2FudmFzKHRoaXMuY3R4KTtcclxuXHR9XHJcblxyXG5cdC8qIC0tIENPTE9SIFRIRU1FIExPR0lDIC0tICovXHJcblx0XHJcblx0cHJpdmF0ZSBzZXRXaGl0ZU1vZGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLmJhY2tncm91bmRDb2xvciA9ICcjYmU4OTg0JztcclxuXHRcdHRoaXMuY29sb3JUaGVtZSA9ICd3aGl0ZSc7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldERhcmtNb2RlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5jb2xvclRoZW1lID0gJ2RhcmsnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgY29sb3JzIG9mIHRoZSBjYW52YXMgdG8gbWF0Y2ggdGhlIG5ldyB0aGVtZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzd2l0Y2hDb2xvclRoZW1lKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuY29sb3JUaGVtZSA9PSAnd2hpdGUnKSB7XHJcblx0XHRcdHRoaXMuc2V0RGFya01vZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXRXaGl0ZU1vZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBEcmF3YWJsZSwgVGlsZSB9IGZyb20gXCIuLi9tb2RlbHMvaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb2QgaW1wbGVtZW50cyBEcmF3YWJsZXtcclxuXHQvKipcclxuXHQgKiBUaGUgZm9vZCdzIFggY29vcmRpbmF0ZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIHghOiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBmb29kJ3MgWSBjb29yZGluYXRlLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgeSE6IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgYSBuZXcgcGllY2Ugb2YgZm9vZCBmb3IgdGhlIHNuYWtlLlxyXG5cdCAqIEBwYXJhbSBmb29kU2l6ZSBTaXplIG9mIHRoZSBmb29kIHRpbGUuXHJcblx0ICogQHBhcmFtIGZvb2RDb2xvciBGaWxsIGNvbG9yIGZvciB0aGUgcGllY2Ugb2YgZm9vZC5cclxuXHQgKiBAcGFyYW0gZm9vZEJvcmRlckNvbG9yIEZpbGwgY29sb3IgZm9yIHRoZSBib3JkZXIgb2YgdGhlIHBpZWNlIG9mIGZvb2QuXHJcblx0ICogQHBhcmFtIFhMaW1pdCBIb3Jpem9udGFsIGJvdW5kYXJ5IHRoYXQgdGhlIGZvb2QncyBjb29yZGluYXRlcyBjYW5ub3QgZXhjZWVkLlxyXG5cdCAqIEBwYXJhbSBZTGltaXQgVmVydGljYWwgYm91bmRhcnkgdGhhdCB0aGUgZm9vZCdzIGNvb3JkaW5hdGVzIGNhbm5vdCBleGNlZWQuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHQgcHJpdmF0ZSBmb29kU2l6ZTogbnVtYmVyLFxyXG5cdFx0IHByaXZhdGUgZm9vZENvbG9yOiBzdHJpbmcsXHJcblx0XHQgcHJpdmF0ZSBmb29kQm9yZGVyQ29sb3I6IHN0cmluZyxcclxuXHJcblx0XHQgcHJpdmF0ZSBYTGltaXQ6IG51bWJlcixcclxuXHRcdCBwcml2YXRlIFlMaW1pdDogbnVtYmVyLFxyXG5cdCkgeyBcclxuXHJcblx0fVxyXG5cclxuXHQvKiAtLSBHZXR0ZXJzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIFNuYWtlLnRzIGNsYXNzIC0tICovXHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGZvb2QncyBYIGNvb3JkaW5hdGUuXHJcblx0ICovXHJcblx0Z2V0IHhDb29yZGluYXRlKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy54O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgZm9vZCdzIFkgY29vcmRpbmF0ZS5cclxuXHQgKi9cclxuXHRnZXQgeUNvb3JkaW5hdGUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLnk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBwaWVjZSBvZiBmb29kIG9uIHRoZSBwYXJlbnQgY2FudmFzLlxyXG5cdCAqIEBwYXJhbSBjb250ZXh0IENhbnZhcyB1cG9uIHdoaWNoIHRvIGRyYXcgdGhlIHBpZWNlIG9mIGZvb2QuXHJcblx0ICovXHJcblx0cHVibGljIGRyYXdPbkNhbnZhcyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuXHRcdGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5mb29kQ29sb3I7XHJcblx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5mb29kQm9yZGVyQ29sb3I7XHJcblxyXG5cdFx0Y29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5mb29kU2l6ZSwgdGhpcy5mb29kU2l6ZSk7XHJcblx0XHRjb250ZXh0LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuZm9vZFNpemUsIHRoaXMuZm9vZFNpemUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGNvb3JkaW5hdGVzIGZvciB0aGUgcGllY2Ugb2YgZm9vZC5cclxuXHQgKiBAcGFyYW0gdGlsZXMgQXJyYXkgb2YgdGlsZXMgdGhhdCB0aGUgc25ha2Ugb2NjdXBpZXMuXHJcblx0ICovXHJcblx0cHVibGljIGdlbmVyYXRlQ29vcmRpbmF0ZXModGlsZXM6IFRpbGVbXSk6IHZvaWQge1xyXG5cdFx0dGhpcy54ID0gdGhpcy5nZXRSYW5kb21Db29yZGluYXRlKDAsIHRoaXMuWExpbWl0IC0gdGhpcy5mb29kU2l6ZSk7XHJcblx0XHR0aGlzLnkgPSB0aGlzLmdldFJhbmRvbUNvb3JkaW5hdGUoMCwgdGhpcy5ZTGltaXQgLSB0aGlzLmZvb2RTaXplKTtcclxuXHJcblx0XHQvLyBBcyBsb25nIGFzIHRoZSBnZW5lcmF0ZWQgY29vcmRpbmF0ZXMgb3ZlcmxhcCB3aXRoIHRoZSBzbmFrZSdzIHRpbGVzLCBjYWxsIHRoaXMgZnVuY3Rpb24gYWdhaW4gdG8gZ2VuZXJhdGUgYW5vdGhlciBwYWlyIG9mIGNvb3JkaW5hdGVzLlxyXG5cdFx0d2hpbGUgKHRoaXMuZm9vZENvbGxpZGVzV2l0aFNuYWtlKHRpbGVzKSlcclxuXHRcdFx0dGhpcy5nZW5lcmF0ZUNvb3JkaW5hdGVzKHRpbGVzKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIHJhbmRvbWx5IGdlbmVyYXRlZCBwaWVjZSBvZiBmb29kIGNvbGxpZGVzIHdpdGggYW55IG9mIHRoZSBzbmFrZSdzIHRpbGVzLlxyXG5cdCAqIEBwYXJhbSB0aWxlcyBTbmFrZSdzIGFycmF5IG9mIHRpbGVzLlxyXG5cdCAqIEByZXR1cm5zIFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZm9vZENvbGxpZGVzV2l0aFNuYWtlKHRpbGVzOiBUaWxlW10pOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aWxlcy5zb21lKHRpbGUgPT4gdGlsZS54ID09PSB0aGlzLnggJiYgdGlsZS55ID09PSB0aGlzLnkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmFuZG9tIGNvb3JkaW5hdGUgZm9yIHRoZSBwaWVjZSBvZiBmb29kLlxyXG5cdCAqIEBwYXJhbSBtaW4gVXN1YWxseSAwLCB3aGljaCBpcyB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGNhbnZhcy5cclxuXHQgKiBAcGFyYW0gbWF4IFRoZSBmdXJ0aGVzdCBwb2ludCBvbiB0aGUgY2FudmFzIHVwb24gd2hpY2ggdGhlIHBpZWNlIG9mIGZvb2QgY2FuIGJlIGdlbmVyYXRlZC5cclxuXHQgKiBAcmV0dXJucyBBIHJhbmRvbSBudW1iZXIgcmVwcmVzZW50aW5nIGEgY29vcmRpbmF0ZS4gTm90ZSB0aGF0IHRoaXMgaXNuJ3QgYW4gKHgsIHkpIHBhaXIuIGl0J3MganVzdCBhIHNpbmdsZSBudW1iZXIuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBnZXRSYW5kb21Db29yZGluYXRlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKSAvIHRoaXMuZm9vZFNpemUpICogdGhpcy5mb29kU2l6ZTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgU25ha2UgZnJvbSBcIi4vU25ha2VcIjtcclxuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9DYW52YXNcIjtcclxuaW1wb3J0IEZvb2QgZnJvbSBcIi4vRm9vZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcblx0LyoqXHJcblx0ICogVGhlIGdhbWUncyBwaWVjZSBvZiBmb29kLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZm9vZDogRm9vZDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1haW4gZ2FtZSBsb29wLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2FtZUludGVydmFsITogUmV0dXJuVHlwZTwgdHlwZW9mIHNldEludGVydmFsID47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBnYW1lIGxvb3AncyBzcGVlZCwgaW4gbWlsbGlzZWNvbmRzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2FtZVNwZWVkOiBudW1iZXIgPSAzMDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgZmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnYW1lIGlzIHJ1bm5pbmcgb3Igbm90LlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcnVubmluZyE6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIGEgbmV3IHBpZWNlIG9mIGZvb2QgYW5kIHJlbmRlcnMgYSBzdGF0aWMgc25ha2Ugb24gdGhlIGdhbWUncyBjYW52YXMuXHJcblx0ICogQHBhcmFtIHNuYWtlIFRoZSBnYW1lJ3Mgc25ha2UuXHJcblx0ICogQHBhcmFtIGNhbnZhcyBUaGUgZ2FtZSdzIGNhbnZhcy5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHB1YmxpYyByZWFkb25seSBzbmFrZTogU25ha2UsXHJcblx0XHRwcml2YXRlIGNhbnZhczogQ2FudmFzLFxyXG5cdCkge1xyXG5cdFx0dGhpcy5mb29kID0gbmV3IEZvb2QodGhpcy5zbmFrZS50aWxlU2l6ZSwgJ2xpZ2h0Z3JlZW4nLCAneWVsbG93JywgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0XHR0aGlzLmluaXRpYWxSZW5kZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2FtZSBzaG91bGQgY29udGludWUgb3Igbm90LlxyXG5cdCAqIFxyXG5cdCAqIFRoZSBnYW1lIHN0b3BzIHdoZW5ldmVyIHRoZSBzbmFrZSBoaXRzIGFueSBvZiB0aGUgY2FudmFzJyBib3VuZGFyaWVzIG9yIGVhdHMgaXRzZWxmLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFzU25ha2VHYW1lRW5kZWQoKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBoZWFkID0gdGhpcy5zbmFrZS5zbmFrZUhlYWQ7XHJcblx0XHRjb25zdCBjb250ZXh0OiBHYW1lID0gdGhpcztcclxuXHJcblx0XHRyZXR1cm4gc25ha2VBdGVJdHNlbGYoY29udGV4dCkgfHwgc25ha2VIaXRCb3VuZGFyaWVzKGNvbnRleHQpO1xyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBzbmFrZUF0ZUl0c2VsZihjb250ZXh0OiBHYW1lKTogYm9vbGVhbiB7XHJcblx0XHRcdC8vIFRoZSBzbmFrZSBjYW4gb25seSBlYXQgb25lIG9mIGl0cyBvd24gdGlsZXMgaWYgaXRzIGxlbmd0aCBpcyA+IDRcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDQ7IGkgPCBjb250ZXh0LnNuYWtlLnRpbGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Ly8gQ2hlY2tpbmcgaWYgdGhlIHNuYWtlJ3MgaGVhZCBjb2xsaWRlcyB3aXRoIGFueSBvZiBpdHMgb3RoZXIgdGlsZXNcclxuXHRcdFx0XHRpZiAoY29udGV4dC5zbmFrZS50aWxlc1tpXS54ID09PSBoZWFkLnggJiYgY29udGV4dC5zbmFrZS50aWxlc1tpXS55ID09PSBoZWFkLnkpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNuYWtlSGl0Qm91bmRhcmllcyhjb250ZXh0OiBHYW1lKSB7XHJcblx0XHRcdC8vIFRoZSB0aWxlIHdpdGggdGhlIGNvb3JkaW5hdGUgJ2NvbnRleHQuY2FudmFzLndpZHRoIC0gY29udGV4dC5zbmFrZS50aWxlU2l6ZScgaXMgdGhlIGxhc3QgdGlsZSBpbiB0aGUgY2FudmFzLlxyXG5cdFx0XHRjb25zdCBoaXRMZWZ0V2FsbCA9IGhlYWQueCA8IDA7XHJcblx0XHRcdGNvbnN0IGhpdFJpZ2h0V2FsbCA9IGhlYWQueCA+IGNvbnRleHQuY2FudmFzLndpZHRoIC0gY29udGV4dC5zbmFrZS50aWxlU2l6ZTsgXHJcblx0XHRcdGNvbnN0IGhpdFRvcHRXYWxsID0gaGVhZC55IDwgMDtcclxuXHRcdFx0Y29uc3QgaGl0Qm90dG9tV2FsbCA9IGhlYWQueSA+IGNvbnRleHQuY2FudmFzLmhlaWdodCAtIGNvbnRleHQuc25ha2UudGlsZVNpemU7XHJcblxyXG5cdFx0XHRyZXR1cm4gaGl0TGVmdFdhbGwgfHwgaGl0UmlnaHRXYWxsIHx8IGhpdFRvcHRXYWxsIHx8IGhpdEJvdHRvbVdhbGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwYXRjaGVzIGEgJ3Jlc2V0LXNjb3JlJyBldmVudCB0byByZXNldCB0aGUgcGxheWVyJ3Mgc2NvcmUuXHJcblx0ICogXHJcblx0ICogVGhlIGxpc3RlbmVyIGZvciB0aGlzIGV2ZW50IGlzIGluIHRoZSBTY29yZUhhbmRsZXIgY2xhc3MuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBkaXNwYXRjaFJlc2V0U2NvcmVFdmVudCgpIHtcclxuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNldC1zY29yZScpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbmRlcnMgYSBzdGF0aWMgc25ha2Ugb24gdGhlIGNhbnZhcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRpYWxSZW5kZXIoKTogdm9pZCB7XHJcblx0XHR0aGlzLmNhbnZhcy5jbGVhcigpO1xyXG5cdFx0dGhpcy5jYW52YXMuZHJhd0VsZW1lbnQodGhpcy5zbmFrZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgc25ha2UgYW5kIGRyYXdzIGl0cyB0aWxlcyBhbmQgdGhlIHBpZWNlIG9mIGZvb2QuXHJcblx0ICovXHJcblx0cHJpdmF0ZSByZW5kZXJHYW1lKCk6IHZvaWQge1xyXG5cclxuXHRcdGlmICh0aGlzLmhhc1NuYWtlR2FtZUVuZGVkKCkpIHtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVJbnRlcnZhbCk7XHJcblx0XHRcdHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmNoYW5nZUdhbWVTdGF0ZSgnWW91IGRpZWQgOiggUHJlc3MgXCJSXCIgdG8gcmVzdGFydCB0aGUgZ2FtZS4nKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYW52YXMuY2xlYXIoKTtcclxuXHRcdHRoaXMuc25ha2UubW92ZSh0aGlzLmZvb2QpO1xyXG5cclxuXHRcdHRoaXMuY2FudmFzLmRyYXdFbGVtZW50KHRoaXMuc25ha2UpO1xyXG5cdFx0dGhpcy5jYW52YXMuZHJhd0VsZW1lbnQodGhpcy5mb29kKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgZ2FtZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhcnQoKTogdm9pZCB7XHJcblx0XHRpZiAoIXRoaXMucnVubmluZykge1xyXG5cdFx0XHR0aGlzLmdhbWVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucmVuZGVyR2FtZS5iaW5kKHRoaXMpLCB0aGlzLmdhbWVTcGVlZCk7XHJcblx0XHRcdHRoaXMuZm9vZC5nZW5lcmF0ZUNvb3JkaW5hdGVzKHRoaXMuc25ha2UudGlsZXMpO1xyXG5cdFx0XHR0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNoYW5nZUdhbWVTdGF0ZSgnJylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBhdXNlcyB0aGUgZ2FtZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgcGF1c2UoKTogdm9pZCB7XHJcblx0XHRjbGVhckludGVydmFsKHRoaXMuZ2FtZUludGVydmFsKTtcclxuXHRcdHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jaGFuZ2VHYW1lU3RhdGUoJ1BhdXNlZC4uLicpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzdW1lcyBhIHBhdXNlZCBnYW1lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZXN1bWUoKTogdm9pZCB7XHJcblx0XHRpZiAoIXRoaXMucnVubmluZykge1xyXG5cdFx0XHR0aGlzLmdhbWVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucmVuZGVyR2FtZS5iaW5kKHRoaXMpLCB0aGlzLmdhbWVTcGVlZCk7XHJcblx0XHRcdHRoaXMucnVubmluZyA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2hhbmdlR2FtZVN0YXRlKCcnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc3RhcnRzIHRoZSBnYW1lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZXN0YXJ0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zbmFrZS5yZXNldENvb3JkaW5hdGVzKCk7XHJcblx0XHR0aGlzLmRpc3BhdGNoUmVzZXRTY29yZUV2ZW50KCk7XHJcblx0XHR0aGlzLmNoYW5nZUdhbWVTdGF0ZSgnJylcclxuXHJcblx0XHQvKiBcclxuXHRcdFx0SXQncyBuZWNlc3NhcnkgdGhhdCB0aGUgZm9vZCBjb29yZGluYXRlcyBiZSBnZW5lcmF0ZWQgXHJcblx0XHRcdG9ubHkgYWZ0ZXIgdGhlIHNuYWtlJ3MgY29vcmRpbmF0ZXMgaGF2ZSBiZWVuIHJlc2V0LCBcclxuXHRcdFx0YmVjYXVzZSB0aGUgZ2VuZXJhdGVDb29yZGluYXRlcyBmdW5jdGlvbiBkZXBlbmRzIG9uIHRoZSBcclxuXHRcdFx0c25ha2UncyB0aWxlcyBhcnJheS5cclxuXHRcdCovXHJcblx0XHR0aGlzLmZvb2QuZ2VuZXJhdGVDb29yZGluYXRlcyh0aGlzLnNuYWtlLnRpbGVzKTtcclxuXHRcdHRoaXMuaW5pdGlhbFJlbmRlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBnYW1lIGlzIHJ1bm5pbmcgb3Igbm90LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpc0dhbWVSdW5uaW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMucnVubmluZztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGNvbG9yIHRoZW1lcyBiZXR3ZWVuIGRhcmsgYW5kIHdoaXRlIG1vZGVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzd2l0Y2hDb2xvclRoZW1lKCk6IHZvaWQge1xyXG5cdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcclxuXHRcdHRoaXMuY2FudmFzLnN3aXRjaENvbG9yVGhlbWUoKTtcclxuXHJcblx0XHQvLyBVcGRhdGVzIHRoZSBjYW52YXMgd2l0aCBuZXcgY29sb3JzIGFuZCByZWRyYXdzIGFsbCBlbGVtZW50cyBvbiBpdFxyXG5cdFx0dGhpcy5jYW52YXMuY2xlYXIoKTtcclxuXHRcdHRoaXMuY2FudmFzLmRyYXdFbGVtZW50KHRoaXMuc25ha2UpO1xyXG5cdFx0dGhpcy5jYW52YXMuZHJhd0VsZW1lbnQodGhpcy5mb29kKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIGdhbWUncyBkaWZmaWN1bHR5IGJ5IGluY3JlYXNpbmcgdGhlIG1haW4gbG9vcCdzIHNwZWVkLlxyXG5cdCAqIEBwYXJhbSBkaWZmaWN1bHR5IFRoZSBuZXcgZGlmZmljdWx0eSAobmV3IGxvb3AncyBzcGVlZCkuXHJcblx0ICovXHJcblx0cHVibGljIGNoYW5nZURpZmZpY3VsdHkoZGlmZmljdWx0eTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLmdhbWVTcGVlZCA9IGRpZmZpY3VsdHk7XHJcblx0XHRcclxuXHRcdC8qIFxyXG5cdFx0XHRXaXRob3V0IGNoZWNraW5nIGZvciB0aGUgcnVubmluZyBwcm9wZXJ0eSwgdGhlIGdhbWUgd291bGRcclxuXHRcdFx0aW1tZWRpYXRlbHkgcnVuIGFmdGVyIGNoYW5naW5nIHRoZSBkaWZmaWN1bHR5LCBldmVuIGlmIGl0IHdlcmUgcGF1c2VkXHJcblx0XHRcdGluIHRoZSBmaXJzdCBwbGFjZS5cdFx0XHJcblx0XHQqLyBcclxuXHRcdGlmICh0aGlzLmlzR2FtZVJ1bm5pbmcoKSkge1xyXG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuZ2FtZUludGVydmFsKTtcclxuXHRcdFx0dGhpcy5nYW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnJlbmRlckdhbWUuYmluZCh0aGlzKSwgdGhpcy5nYW1lU3BlZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hhbmdlcyB0aGUgZ2FtZSBzdGF0ZSB0byBpbmRpY2F0ZSB3aGV0aGVyIGl0J3MgcnVubmluZyBvciBwYXVzZWQuXHJcblx0ICogQHBhcmFtIHN0YXRlIE5leHQgZ2FtZSBzdGF0ZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIGNoYW5nZUdhbWVTdGF0ZShzdGF0ZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBnYW1lU3RhdGVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1zdGF0ZScpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cdFx0Z2FtZVN0YXRlRGl2LmlubmVySFRNTCA9IHN0YXRlO1xyXG5cdH1cclxufSIsImltcG9ydCB7IFRpbGUsIERyYXdhYmxlIH0gZnJvbSBcIi4uL21vZGVscy9pbmRleFwiO1xyXG5pbXBvcnQgRm9vZCBmcm9tICcuL0Zvb2QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2UgaW1wbGVtZW50cyBEcmF3YWJsZSB7XHJcblx0LyoqXHJcblx0ICogVGhlIGluaXRpYWwgWCBjb29yZGluYXRlIGZvciB0aGUgZmlyc3QgdGlsZSBvZiB0aGUgc25ha2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0aWFsWFBvczogbnVtYmVyID0gMTAwO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaW5pdGlhbCBZIGNvb3JkaW5hdGUgZm9yIHRoZSBmaXJzdCB0aWxlIG9mIHRoZSBzbmFrZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRpYWxZUG9zOiBudW1iZXIgPSAxMDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2Ygc3RhcnRpbmcgdGlsZXMgaW4gdGhlIHNuYWtlJ3MgYXJyYXkuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBudW1PZlN0YXJ0aW5nQmxvY2tzOiBudW1iZXIgPSA0O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc25ha2UgaXMgZ29pbmcgdXAgb3IgZG93bi5cclxuXHQgKi9cclxuXHRwcml2YXRlIHZlcnRpY2FsU3BlZWQ6IG51bWJlciA9IDA7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzbmFrZSBpcyBnb2luZyBsZWZ0IG9yIHJpZ2h0LlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaG9yaXpvbnRhbFNwZWVkOiBudW1iZXIgPSAoLTEpICogdGhpcy50aWxlU2l6ZTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNuYWtlJ3MgdGlsZXMnIGFycmF5LlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX3RpbGVzOiBUaWxlW10gPSBbXTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyBhIG5ldyBzbmFrZSBhbmQgYWRqdXN0cyBpdHMgY29vcmRpbmF0ZXMuXHJcblx0ICogQHBhcmFtIHRpbGVTaXplIFRoZSBzbmFrZSdzIHRpbGUgc2l6ZSBpbiBwaXhlbHMuXHJcblx0ICogQHBhcmFtIHRpbGVDb2xvciBUaGUgY29sb3Igb2Ygbm9ybWFsIHRpbGVzLlxyXG5cdCAqIEBwYXJhbSBoZWFkQ29sb3IgVGhlIGNvbG9yIG9mIHRoZSBmaXJzdCB0aWxlICh0aGUgaGVhZCkuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgcmVhZG9ubHkgdGlsZVNpemU6IG51bWJlcixcclxuXHRcdHByaXZhdGUgdGlsZUNvbG9yOiBzdHJpbmcsXHJcblx0XHRwcml2YXRlIGhlYWRDb2xvcjogc3RyaW5nLFxyXG5cdCkge1xyXG5cdFx0dGhpcy5yZXNldENvb3JkaW5hdGVzKCk7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHNuYWtlJ3MgdGlsZXMnIGFycmF5LlxyXG5cdCAqL1xyXG5cdGdldCB0aWxlcygpOiBUaWxlW10ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RpbGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgc25ha2UncyBoZWFkIHRpbGUuXHJcblx0ICovXHJcblx0Z2V0IHNuYWtlSGVhZCgpOiBUaWxlIHtcclxuXHRcdHJldHVybiB0aGlzLnRpbGVzWzBdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBzbmFrZSBoYXMgZWF0ZW4gYSBwaWVjZSBvZiBmb29kIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0gbmV3SGVhZCBOZXcgaGVhZCB0aWxlIGFmdGVyIHRoZSBzbmFrZSBtb3Zlcy5cclxuXHQgKiBAcGFyYW0gZm9vZCBUaGUgY3VycmVudCBwaWVjZSBvZiBmb29kIG9uIHRoZSBjYW52YXMuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYXNTbmFrZUVhdGVuRm9vZChuZXdIZWFkOiBUaWxlLCBmb29kOiBGb29kKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gbmV3SGVhZC54ID09PSBmb29kLnhDb29yZGluYXRlICYmIG5ld0hlYWQueSA9PT0gZm9vZC55Q29vcmRpbmF0ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BhdGNoZXMgYSAnZm9vZC1lYXRlbicgZXZlbnQgaW4gb3JkZXIgZm9yIHRoZSBzY29yZSB0byBpbmNyZWFzZS5cclxuXHQgKiBcclxuXHQgKiBUaGUgbGlzdGVuZXIgZm9yIHRoaXMgZXZlbnQgaXMgaW4gdGhlIFNjb3JlSGFuZGxlciBjbGFzcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIGRpc3BhdGNoRm9vZEVhdGVuRXZlbnQoKTogdm9pZCB7XHJcblx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZm9vZC1lYXRlbicpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIGFuIGluZGl2aWR1YWwgc25ha2UgdGlsZSBvbiB0aGUgY2FudmFzLlxyXG5cdCAqIEBwYXJhbSB0aWxlIFRoZSBzbmFrZSB0aWxlIHRvIGJlIGRyYXduLlxyXG5cdCAqIEBwYXJhbSB0aWxlSW5kZXggVGhlIGluZGV4IG9mIHRoZSB0aWxlIHRvIGJlIGRyYXduICh1c2VmdWwgdG8ga25vdyBpZiBpdCdzIHRoZSBoZWFkIHRpbGUpLlxyXG5cdCAqIEBwYXJhbSBwYXJlbnRDYW52YXNDb250ZXh0IFRoZSAyRCBjb250ZXh0IG9mIHRoZSBjYW52YXMgdXBvbiB3aGljaCB0aGUgdGlsZSB3aWxsIGJlIGRyYXduLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZHJhd1NuYWtlVGlsZSh0aWxlOiBUaWxlLCB0aWxlSW5kZXg6IG51bWJlciwgcGFyZW50Q2FudmFzQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcblx0XHRwYXJlbnRDYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IHRpbGVJbmRleCA9PT0gMCA/IHRoaXMuaGVhZENvbG9yIDogdGhpcy50aWxlQ29sb3I7XHJcblx0XHRwYXJlbnRDYW52YXNDb250ZXh0LnN0cm9rZVN0eWxlID0gJ2RhcmtibHVlJztcclxuXHRcdFxyXG5cdFx0Y29uc3QgeyB4LCB5IH0gPSB0aWxlO1xyXG5cdFx0cGFyZW50Q2FudmFzQ29udGV4dC5maWxsUmVjdCh4LCB5LCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuXHRcdHBhcmVudENhbnZhc0NvbnRleHQuc3Ryb2tlUmVjdCh4LCB5LCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSB3aG9sZSBzbmFrZSBvbiB0aGUgY2FudmFzLlxyXG5cdCAqIEBwYXJhbSBjb250ZXh0IFRoZSAyRCBjb250ZXh0IG9mIHRoZSBjYW52YXMgdXBvbiB3aGljaCB0aGUgdGlsZSB3aWxsIGJlIGRyYXduLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkcmF3T25DYW52YXMoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcblx0XHR0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUsIHRpbGVJbmRleCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRyYXdTbmFrZVRpbGUodGlsZSwgdGlsZUluZGV4LCBjb250ZXh0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIHRpbGVzIG9mIHRoZSBzbmFrZS5cclxuXHQgKiBAcGFyYW0gZm9vZCBUaGUgcGllY2Ugb2YgZm9vZCB0aGF0IHRoZSBzbmFrZSB3aWxsIGVhdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgbW92ZShmb29kOiBGb29kKTogdm9pZCB7XHJcblx0XHRjb25zdCBuZXdIZWFkOiBUaWxlID0ge1xyXG5cdFx0XHR4OiB0aGlzLnRpbGVzWzBdLnggKyB0aGlzLmhvcml6b250YWxTcGVlZCxcclxuXHRcdFx0eTogdGhpcy50aWxlc1swXS55ICsgdGhpcy52ZXJ0aWNhbFNwZWVkXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50aWxlcy51bnNoaWZ0KG5ld0hlYWQpO1xyXG5cclxuXHRcdC8vIEdlbmVyYXRlIGEgbmV3IHBpZWNlIG9mIGZvb2QgYW5kIGluY3JlYXNlIHNjb3JlIGlmIHRoZSBzbmFrZSBoYXMgZWF0ZW4gdGhlIGZvb2RcclxuXHRcdGlmICh0aGlzLmhhc1NuYWtlRWF0ZW5Gb29kKG5ld0hlYWQsIGZvb2QpKSB7XHJcblx0XHRcdGZvb2QuZ2VuZXJhdGVDb29yZGluYXRlcyh0aGlzLnRpbGVzKTtcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEZvb2RFYXRlbkV2ZW50KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIHNuYWtlIG1vdmVzIG5vcm1hbGx5IGluIHRoaXMgY2FzZVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMudGlsZXMucG9wKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNldHMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgc25ha2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSByZXNldERpcmVjdGlvbigpOiB2b2lkIHtcclxuXHRcdHRoaXMuaG9yaXpvbnRhbFNwZWVkID0gKC0xKSAqIHRoaXMudGlsZVNpemU7XHJcblx0XHR0aGlzLnZlcnRpY2FsU3BlZWQgPSAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBjdXJyZW50IHRpbGVzIGFycmF5IGFuZCBjcmVhdGVzIGEgbmV3IG9uZSB3aXRoIG5ldyBjb29yZGluYXRlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVzZXRDb29yZGluYXRlcygpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVzZXREaXJlY3Rpb24oKTtcclxuXHRcdHRoaXMuX3RpbGVzID0gW107XHJcblxyXG5cdFx0bGV0IGZpcnN0WFBvcyA9IHRoaXMuaW5pdGlhbFhQb3M7XHJcblx0XHRsZXQgZmlyc3RZUG9zID0gdGhpcy5pbml0aWFsWVBvcztcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bU9mU3RhcnRpbmdCbG9ja3M7IGkrKykge1xyXG5cdFx0XHR0aGlzLnRpbGVzLnB1c2goe1xyXG5cdFx0XHRcdHg6IGZpcnN0WFBvcyxcclxuXHRcdFx0XHR5OiBmaXJzdFlQb3NcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRmaXJzdFhQb3MgKz0gdGhpcy50aWxlU2l6ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoYW5nZXMgdGhlIHNuYWtlJ3MgZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhlIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNwZWVkcyBpbiB0aGlzIGNsYXNzIHJlcHJlc2VudCBkaXJlY3Rpb25zXHJcblx0ICogd2l0aCBuZWdhdGl2ZSB2YWx1ZXMgaW5kaWNhdGluZyBsZWZ0IGFuZCBkb3dud2FyZHMsIGFuZCBwb3NpdGl2ZSBvbmVzIGluZGljYXRpbmcgcmlnaHQgYW5kIHVwd2FyZHMuXHJcblx0ICogQHBhcmFtIHByZXNzZWRLZXlDb2RlIFRoZSBjb2RlIG9mIHRoZSBwcmVzc2VkIGtleS5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2hhbmdlRGlyZWN0aW9uKHByZXNzZWRLZXlDb2RlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcblx0XHQvLyBpZiAodGhpcy5fY2hhbmdpbmdEaXJlY3Rpb24pIHJldHVybjsgLy91c2VkIHRvIHByZXZlbnQgdGhlIHNuYWtlIGZyb20gZ29pbmcgaW50byB0aGUgcmV2ZXJzZSBkaXJlY3Rpb24uIGZvciBleGFtcGxlLCBnb2luZyB1cCBhbmQgdGhlbiBkb3duXHJcblx0XHQvLyB0aGUgc25ha2Ugd291bGQgaGF2ZSB0byB3YWl0IGZvciB0aGlzIGZ1bmN0aW9uIHRvIHJldHVybiBhbmQgZm9yIHRoZSBHYW1lIGxvb3AgdG8gcnVuIGFnYWluIHRvIGJlIGFibGUgdG8gY2hhbmdlIGRpcmVjdGlvblxyXG5cdFx0Ly8gdGhpcy5fY2hhbmdpbmdEaXJlY3Rpb24gPSB0cnVlO1xyXG5cclxuXHRcdGNvbnN0IGdvaW5nVXAgPSB0aGlzLnZlcnRpY2FsU3BlZWQgPT09ICgtMSkgKiB0aGlzLnRpbGVTaXplO1xyXG5cdFx0Y29uc3QgZ29pbmdEb3duID0gdGhpcy52ZXJ0aWNhbFNwZWVkID09PSB0aGlzLnRpbGVTaXplO1xyXG5cdFx0Y29uc3QgZ29pbmdSaWdodCA9IHRoaXMuaG9yaXpvbnRhbFNwZWVkID09PSB0aGlzLnRpbGVTaXplO1xyXG5cdFx0Y29uc3QgZ29pbmdMZWZ0ID0gdGhpcy5ob3Jpem9udGFsU3BlZWQgPT09ICgtMSkgKiB0aGlzLnRpbGVTaXplO1xyXG5cclxuXHRcdGlmIChwcmVzc2VkS2V5Q29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgIWdvaW5nUmlnaHQpIHtcclxuXHRcdFx0dGhpcy5ob3Jpem9udGFsU3BlZWQgPSAoLTEpICogdGhpcy50aWxlU2l6ZTtcclxuXHRcdFx0dGhpcy52ZXJ0aWNhbFNwZWVkID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIGlmIChwcmVzc2VkS2V5Q29kZSA9PT0gJ0Fycm93UmlnaHQnICYmICFnb2luZ0xlZnQpIHtcclxuXHRcdFx0dGhpcy5ob3Jpem9udGFsU3BlZWQgPSB0aGlzLnRpbGVTaXplO1xyXG5cdFx0XHR0aGlzLnZlcnRpY2FsU3BlZWQgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2UgaWYgKHByZXNzZWRLZXlDb2RlID09PSAnQXJyb3dVcCcgJiYgIWdvaW5nRG93bikge1xyXG5cdFx0XHR0aGlzLmhvcml6b250YWxTcGVlZCA9IDA7XHJcblx0XHRcdHRoaXMudmVydGljYWxTcGVlZCA9ICgtMSkgKiB0aGlzLnRpbGVTaXplO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2UgaWYgKHByZXNzZWRLZXlDb2RlID09PSAnQXJyb3dEb3duJyAmJiAhZ29pbmdVcCkge1xyXG5cdFx0XHR0aGlzLmhvcml6b250YWxTcGVlZCA9IDA7XHJcblx0XHRcdHRoaXMudmVydGljYWxTcGVlZCA9IHRoaXMudGlsZVNpemU7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2NsYXNzZXMvR2FtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5Ym9hcmRIYW5kbGVyIHtcclxuXHQvKipcclxuXHQgKiBBIGZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2FtZSBoYXMgYWxyZWFkeSBzdGFydGVkLlxyXG5cdCAqIFVzZWZ1bCBmb3IgaGFuZGxpbmcgdGhlIHBhdXNlL3Jlc3VtZSBnYW1lIHN0YXRlcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIGdhbWVIYXNTdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIGtleWJvYXJkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHNuYWtlIGdhbWUuXHJcblx0ICogQHBhcmFtIHNuYWtlR2FtZSBTbmFrZSBnYW1lIGluc3RhbmNlIHRvIGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRvLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc25ha2VHYW1lOiBHYW1lKSB7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcyk7XHJcblx0IH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBnYW1lIHN0YXRlcyBieSBsaXN0ZW5pbmcgdG8gdGhlIGtleWRvd24gZXZlbnQuXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBrZXlib2FyZCBldmVudCB0aGF0IGdldHMgZmlyZWQuXHJcblx0ICovXHJcblx0cHVibGljIGhhbmRsZUV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblx0XHRjb25zdCBwcmVzc2VkS2V5Q29kZTogc3RyaW5nID0gZXZlbnQuY29kZTtcclxuXHJcblx0XHRpZiAocHJlc3NlZEtleUNvZGUgPT09ICdTcGFjZScpIHtcclxuXHRcdFx0dGhpcy5oYW5kbGVTcGFjZWJhcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2UgaWYgKHByZXNzZWRLZXlDb2RlID09PSAnS2V5UicpIHtcclxuXHRcdFx0dGhpcy5oYW5kbGVSS2V5KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXJyb3cga2V5cyBhcmUgcHJlc3NlZCBpbiB0aGlzIGNhc2VcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNuYWtlR2FtZS5zbmFrZS5jaGFuZ2VEaXJlY3Rpb24ocHJlc3NlZEtleUNvZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBTdGFydHMvUGF1c2VzL1Jlc3VtZXMgdGhlIGdhbWUuXHJcblx0ICogQHBhcmFtIHByZXNzZWRLZXlDb2RlIENvZGUgZm9yIHRoZSBwcmVzc2VkIGtleSAoc3BhY2UpLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlU3BhY2ViYXIoKTogdm9pZCB7XHJcblx0XHRcclxuXHRcdC8qIFxyXG5cdFx0XHRJIHdhbnQgdG8gbWFrZSB0b2dnbGluZyB0aGUgZGFyayBtb2RlIHN3aXRjaCBwb3NzaWJsZSB0aHJvdWdoIHRoZSBzcGFjZWJhciBrZXksXHJcblx0XHRcdGJ1dCBJIGRvbid0IHdhbnQgdGhlIGdhbWUgdG8gc3RhcnQvYmUgcGF1c2VkIHdoZW4gdXNlcnMgc3dpdGNoIHRoaXMgYnV0dG9uIHVzaW5nIHRoZSBzcGFjZWJhci4gVGhleSBcclxuXHRcdFx0d291bGQgaGF2ZSB0byBjbGljayBzb21ldGhpbmcgZWxzZSBvbiB0aGUgc2NyZWVuIHRvIGJlIGFibGUgdG8gc3RhcnQvcGF1c2UgdGhlIGdhbWUuXHJcblx0XHQqL1xyXG5cdFx0XHJcblx0XHRpZiAoaXNEYXJrTW9kZUlucHV0Rm9jdXNlZCgpKSByZXR1cm47XHJcblxyXG5cdFx0Ly8gU3RhcnQgdGhlIGdhbWUgaWYgaXQgaGFzbid0IGJlZW4gc3RhcnRlZCB5ZXRcclxuXHRcdGlmICh0aGlzLmdhbWVIYXNTdGFydGVkID09PSBmYWxzZSkge1xyXG5cdFx0XHR0aGlzLnNuYWtlR2FtZS5zdGFydCgpO1xyXG5cdFx0XHR0aGlzLmdhbWVIYXNTdGFydGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBQYXVzZSB0aGUgZ2FtZSBpZiBpdCBoYXMgYWxyZWFkeSBzdGFydGVkIGFuZCBpcyBjdXJyZW50bHkgcnVubmluZ1xyXG5cdFx0ZWxzZSBpZiAodGhpcy5zbmFrZUdhbWUuaXNHYW1lUnVubmluZygpKSB7XHJcblx0XHRcdHRoaXMuc25ha2VHYW1lLnBhdXNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIGdhbWUgaXMgcGF1c2VkIGluIHRoaXMgY2FzZSwgc28gcmVzdW1lIGl0XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5zbmFrZUdhbWUucmVzdW1lKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXN0YXJ0cyB0aGUgZ2FtZS5cclxuXHQgKiBAcGFyYW0gcHJlc3NlZEtleUNvZGUgQ29kZSBmb3IgdGhlIHByZXNzZWQga2V5IChSKS5cclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZVJLZXkoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNuYWtlR2FtZS5yZXN0YXJ0KCk7XHJcblx0XHR0aGlzLmdhbWVIYXNTdGFydGVkID0gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBkYXJrIG1vZGUgc3dpdGNoIGJ1dHRvbiBpcyBmb2N1c2VkIG9yIG5vdC5cclxuICovXHJcbmZ1bmN0aW9uIGlzRGFya01vZGVJbnB1dEZvY3VzZWQoKSB7XHJcblx0Y29uc3QgZGFya01vZGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrX21vZGVfaW5wdXQnKSE7XHJcblx0cmV0dXJuIGRhcmtNb2RlSW5wdXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi4vY2xhc3Nlcy9HYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWZmaWN1bHR5SGFubGRlciB7XHJcblx0LyoqXHJcblx0ICogVGhlIG1vZGFsIHRoYXQgY29udGFpbnMgdGhlIG9wdGlvbnMgb2YgdGhlIGdhbWUuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvcHRpb25zTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3B0aW9ucycpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG9wdGlvbnMgbW9kYWwuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvcHRpb25zTW9kYWxPcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tb3Blbi1tb2RhbCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYnV0dG9uIHRoYXQgY2xvc2VzIHRoZSBvcHRpb25zIG1vZGFsLiBJdCdzIHBsYWNlZCBpbnNpZGUgdGhlIG1vZGFsIGl0c2VsZi5cclxuXHQgKi9cclxuXHRwcml2YXRlIG9wdGlvbnNNb2RhbENsb3NlQnV0dG9uPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1jbG9zZS1tb2RhbCcpIGFzIEhUTUxCdXR0b25FbGVtZW50OztcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHRoZW1lIHRvZ2dsZSBidXR0b24uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBkYXJrTW9kZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhcmtfbW9kZV9pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzZWxlY3QgdGFnIHRoYXQgY2hhbmdlcyB0aGUgZ2FtZSdzIGRpZmZpY3VsdHkuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBkaWZmaWN1bHR5Q29udHJvbGxlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWRpZmZpY3VsdHknKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGl6ZXMgb3B0aW9ucyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBzbmFrZSBnYW1lLlxyXG5cdCAqIEBwYXJhbSBzbmFrZUdhbWUgU25ha2UgZ2FtZSBpbnN0YW5jZSB0byBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVycyB0by5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWtlR2FtZTogR2FtZSkgeyBcclxuXHRcdC8vIE9wdGlvbnMgbW9kYWwgY2xvc2UgYW5kIG9wZW4gYnV0dG9uc1xyXG5cdFx0dGhpcy5vcHRpb25zTW9kYWxPcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vcGVuT3B0aW9uc01vZGFsKCkpO1xyXG5cdFx0dGhpcy5vcHRpb25zTW9kYWxDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMuY2xvc2VPcHRpb25zTW9kYWwoKSk7XHJcblxyXG5cdFx0Ly8gVGhlbWUgY2hhbmdlIGJ1dHRvblxyXG5cdFx0dGhpcy5kYXJrTW9kZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMuY2hhbmdlVGhlbWUoKSk7XHJcblxyXG5cdFx0Ly8gRGlmZmljdWx0eSBjb250cm9sbGVyXHJcblx0XHR0aGlzLmRpZmZpY3VsdHlDb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMuY2hhbmdlRGlmZmljdWx0eShldmVudCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogT3BlbnMgdGhlIG9wdGlvbnMgbW9kYWwsIHdoaWNoIGNhdXNlcyB0aGUgZ2FtZSB0byBwYXVzZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIG9wZW5PcHRpb25zTW9kYWwoKTogdm9pZCB7XHJcblx0XHR0aGlzLm9wdGlvbnNNb2RhbC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcblx0XHR0aGlzLnNuYWtlR2FtZS5wYXVzZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xvc2VzIHRoZSBvcHRpb25zIG1vZGFsLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2xvc2VPcHRpb25zTW9kYWwoKTogdm9pZCB7XHJcblx0XHR0aGlzLm9wdGlvbnNNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGFuZ2VzIHRoZSBnYW1lJ3MgdGhlbWUuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjaGFuZ2VUaGVtZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc25ha2VHYW1lLnN3aXRjaENvbG9yVGhlbWUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBzbmFrZSBnYW1lJ3MgY2hhbmdlRGlmZmljdWx0eSBtZXRob2QuXHJcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBkaWZmaWN1bHR5IGNvbnRyb2xsZXIncyBjaGFuZ2UgZXZlbnQuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjaGFuZ2VEaWZmaWN1bHR5KGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgbmV3RGlmZmljdWx0eSA9IHRoaXMuZ2V0TmV3RGlmZmljdWx0eSgpO1xyXG5cclxuXHRcdHRoaXMuc25ha2VHYW1lLmNoYW5nZURpZmZpY3VsdHkobmV3RGlmZmljdWx0eSk7XHJcblx0XHR0aGlzLmRpZmZpY3VsdHlDb250cm9sbGVyLmJsdXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGRpZmZpY3VsdHkgdGhhdCB0aGUgdXNlciBzcGVjaWZpZXMuXHJcblx0ICogXHJcblx0ICogTm90ZSB0aGF0IGRpZmZpY3VsdHkgaXMgYSBudW1iZXIgdGhhdCBpbmRpY2F0ZXMgdGhlIGdhbWUgbG9vcCdzIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIGdldE5ld0RpZmZpY3VsdHkoKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkRGlmZmljdWx0eUluZGV4ID0gdGhpcy5kaWZmaWN1bHR5Q29udHJvbGxlci5zZWxlY3RlZEluZGV4O1xyXG5cdFx0Y29uc3QgZGlmZmljdWx0eSA9IHRoaXMuZGlmZmljdWx0eUNvbnRyb2xsZXIub3B0aW9uc1tzZWxlY3RlZERpZmZpY3VsdHlJbmRleF0udmFsdWU7XHJcblxyXG5cdFx0cmV0dXJuIHBhcnNlSW50KGRpZmZpY3VsdHkpO1xyXG5cdH1cclxuXHJcbn0iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi4vY2xhc3Nlcy9HYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZUhhbmRsZXIge1xyXG5cdC8qKlxyXG5cdCAqIFRoZSBzcGFuIHRoYXQgY29udGFpbnMgdGhlIGdhbWUncyBzY29yZS5cclxuXHQgKi9cclxuXHRwcml2YXRlIHNjb3JlU3BhbjogSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc3BhbiB0aGF0IGNvbnRyb2xzIHRoZSBnYW1lJ3Mgc2NvcmUgYW5pbWF0aW9uLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2NvcmVBbmltYXRpb25TcGFuOiBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBzb3VuZCBlZmZlY3QgdG8gcGxheSB3aGVuIHRoZSBzbmFrZSBlYXRzIGEgcGllY2Ugb2YgZm9vZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIGZvb2RFYXRlbkF1ZGlvID0gbmV3IEF1ZGlvKCcvZGlzdC9zb3VuZHMvZWF0LWZvb2Qud2F2Jyk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemVzIHNjb3JlIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHNuYWtlIGdhbWUuXHJcblx0ICogQHBhcmFtIHNuYWtlR2FtZSBTbmFrZSBnYW1lIGluc3RhbmNlIHRvIGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRvLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc25ha2VHYW1lOiBHYW1lKSB7IFxyXG5cdFx0dGhpcy5zY29yZVNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKSE7XHJcblx0XHR0aGlzLnNjb3JlQW5pbWF0aW9uU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS1hbmltYXRpb24nKSE7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9vZC1lYXRlbicsICgpID0+IHRoaXMuaW5jcmVhc2VTY29yZSgpKTtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0LXNjb3JlJywgKCkgPT4gdGhpcy5yZXNldFNjb3JlKCkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5jcmVhc2VzIHRoZSBwbGF5ZXIncyBzY29yZSBieSAxLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5jcmVhc2VTY29yZSgpOiB2b2lkIHtcclxuXHRcdGxldCBjdXJyZW50U2NvcmUgPSB0aGlzLnNjb3JlU3Bhbi5pbm5lckhUTUw7XHJcblx0XHRsZXQgbmV3U2NvcmUgPSBwYXJzZUludChjdXJyZW50U2NvcmUpICsgMTtcclxuXHJcblx0XHR0aGlzLnNjb3JlU3Bhbi5pbm5lckhUTUwgPSBuZXdTY29yZS50b1N0cmluZygpO1xyXG5cdFx0dGhpcy5wbGF5U2NvcmVBbmltYXRpb24oKTtcclxuXHRcdHRoaXMuZm9vZEVhdGVuQXVkaW8ucGxheSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzZXRzIHRoZSBwbGF5ZXIncyBzY29yZSB0byAwLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVzZXRTY29yZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2NvcmVTcGFuLmlubmVySFRNTCA9ICcwJztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBsYXlzIHRoZSArMSBzY29yZSBhbmltYXRpb24uXHJcblx0ICovXHJcblx0cHJpdmF0ZSBwbGF5U2NvcmVBbmltYXRpb24oKSB7XHJcblx0XHR0aGlzLnNjb3JlQW5pbWF0aW9uU3Bhbi5jbGFzc0xpc3QuYWRkKCdhbmltYXRlZCcpO1xyXG5cclxuXHRcdC8vIFJlbW92ZSB0aGUgYW5pbWF0aW9uIGNsYXNzIGFmdGVyIHRoZSBhbmltYXRpb24gZW5kcy5cclxuXHRcdHRoaXMuc2NvcmVBbmltYXRpb25TcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcclxuXHRcdFx0dGhpcy5zY29yZUFuaW1hdGlvblNwYW4uY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0ZWQnKTtcclxuXHRcdH0pXHJcblx0fVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2NsYXNzZXMvR2FtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91Y2hIYW5kbGVyIHtcclxuXHQvKipcclxuXHQgKiBUaGUgZGl2IHRoYXQgY29udGFpbnMgY29udHJvbCBhcnJvd3MgZm9yIG1vYmlsZSBzY3JlZW5zLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbW9iaWxlQXJyb3dzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vYmlsZS1hcnJvd3MnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHBhdXNlIGFuZCBzdGFydCBidXR0b25zIG9uIG1vYmlsZSBzY3JlZW5zLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZ2FtZUNvbnRyb2xCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWUtY29udHJvbHMtY29udGFpbmVyIGJ1dHRvbicpIGFzIE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplcyB0b3VjaCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBzbmFrZSBnYW1lLlxyXG5cdCAqIEBwYXJhbSBzbmFrZUdhbWUgU25ha2UgZ2FtZSBpbnN0YW5jZSB0byBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVycyB0by5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWtlR2FtZTogR2FtZSkge1xyXG5cdFx0dGhpcy5tb2JpbGVBcnJvd3NEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmhhbmRsZUFycm93c0V2ZW50KGV2ZW50KSk7XHJcblxyXG5cdFx0dGhpcy5nYW1lQ29udHJvbEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcblx0XHRcdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRjb25zdCBldmVudENvZGUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50KS5kYXRhc2V0LnRvZ2dsZSE7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGVHYW1lQ29udHJvbEJ1dHRvbnMoZXZlbnRDb2RlKTtcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0IH1cclxuXHJcblx0cHJpdmF0ZSBoYW5kbGVBcnJvd3NFdmVudChldmVudDogRXZlbnQpOiB2b2lkIHtcclxuXHRcdC8vIEV2ZW50IHRhcmdldCBtaWdodCBiZSBhbiBzdmcgZWxlbWVudCwgYnV0IEkgd2FudCB0aGUgcGFyZW50IGJ1dHRvbiBlbGVtZW50IGluc3RlYWQuXHJcblx0XHRjb25zdCBldmVudFRhcmdldCA9IChldmVudC50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQpLmNsb3Nlc3QoJ2J1dHRvbicpITtcclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50VGFyZ2V0ICE9PSBudWxsICYmIGV2ZW50VGFyZ2V0LmRhdGFzZXQuY29kZSkge1xyXG5cdFx0XHR0aGlzLnNuYWtlR2FtZS5zbmFrZS5jaGFuZ2VEaXJlY3Rpb24oZXZlbnRUYXJnZXQuZGF0YXNldC5jb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaGFuZGxlR2FtZUNvbnRyb2xCdXR0b25zKGJ1dHRvbkNvZGU6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0bGV0IGNvZGU7XHJcblx0XHRpZiAoYnV0dG9uQ29kZSA9PT0gJ3N0YXJ0JykgY29kZSA9ICdTcGFjZSc7XHJcblx0XHRlbHNlIGlmIChidXR0b25Db2RlID09PSAncmVzdGFydCcpIGNvZGUgPSAnS2V5Uic7XHJcblxyXG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgS2V5Ym9hcmRFdmVudCgna2V5ZG93bicsIHtcclxuXHRcdFx0Y29kZTogY29kZVxyXG5cdFx0fSkpXHJcblx0fVxyXG5cclxufSIsImltcG9ydCBHYW1lIGZyb20gXCIuLi9jbGFzc2VzL0dhbWVcIjtcclxuaW1wb3J0IEtleWJvYXJkSGFuZGxlciBmcm9tIFwiLi9LZXlib2FyZEhhbmRsZXJcIjtcclxuaW1wb3J0IFRvdWNoSGFuZGxlciBmcm9tIFwiLi9Ub3VjaEhhbmRsZXJcIjtcclxuaW1wb3J0IFNjb3JlSGFuZGxlciBmcm9tIFwiLi9TY29yZUhhbmRsZXJcIjtcclxuaW1wb3J0IE9wdGlvbnNIYW5kbGVyIGZyb20gXCIuL09wdGlvbnNIYW5kbGVyXCI7XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXJzIHRvdWNoLCBrZXlib2FyZCwgdGhlbWUsIGFuZCBzY29yZSBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBgc25ha2VHYW1lYCBwYXJhbWV0ZXIuXHJcbiAqIEBwYXJhbSBzbmFrZUdhbWUgVGhlIHNuYWtlIGdhbWUgaW5zdGFuY2UgdG8gYWRkIGV2ZW50IGxpc3RlbmVycyB0by5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckV2ZW50SGFuZGxlcnMoc25ha2VHYW1lOiBHYW1lKTogdm9pZCB7XHJcblxyXG5cdC8qIC0tIENvbnRyb2xzIC0tICovXHJcblx0Y29uc3Qga2V5Ym9hcmRIYW5kbGVyID0gbmV3IEtleWJvYXJkSGFuZGxlcihzbmFrZUdhbWUpO1xyXG5cdGNvbnN0IHRvdWNoSGFuZGxlciA9IG5ldyBUb3VjaEhhbmRsZXIoc25ha2VHYW1lKTtcclxuXHJcblx0LyogLS0gU2NvcmUgLS0gKi9cclxuXHRjb25zdCBzY29yZUhhbmRsZXIgPSBuZXcgU2NvcmVIYW5kbGVyKHNuYWtlR2FtZSk7XHJcblxyXG5cdC8qIC0tIE9wdGlvbnMgLS0gKi9cclxuXHRjb25zdCBvcHRpb25zSGFuZGxlciA9IG5ldyBPcHRpb25zSGFuZGxlcihzbmFrZUdhbWUpO1xyXG5cdFxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU25ha2VHYW1lIGZyb20gXCIuL2NsYXNzZXMvR2FtZVwiO1xyXG5pbXBvcnQgU25ha2UgZnJvbSBcIi4vY2xhc3Nlcy9TbmFrZVwiO1xyXG5pbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NsYXNzZXMvQ2FudmFzXCI7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRXZlbnRIYW5kbGVycyB9IGZyb20gXCIuL2V2ZW50SGFuZGxlcnMvaW5kZXhcIjtcclxuXHJcblxyXG4vLyBSZWR1Y2UgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGNhbnZhcyBvbiBzbWFsbGVyIHNjcmVlbnMuIFRoaXMgb25seSBoYXBwZW5zIHdoZW4gdGhlIGdhbWUgaXMgbG9hZGVkLlxyXG5jb25zdCBtZWRpYVF1ZXJ5ID0gbWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNTc2cHgpJyk7XHJcbmxldCBjYW52YXNXaWR0aDogbnVtYmVyO1xyXG5sZXQgY2FudmFzSGVpZ2h0OiBudW1iZXI7XHJcblxyXG5pZiAobWVkaWFRdWVyeS5tYXRjaGVzKSB7XHJcblx0Y2FudmFzV2lkdGggPSBjYW52YXNIZWlnaHQgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDUwO1xyXG59XHJcblxyXG5lbHNlIHtcclxuXHRjYW52YXNXaWR0aCA9IGNhbnZhc0hlaWdodCA9IDUwMDtcclxufVxyXG5cclxuY29uc3QgY2FudmFzID0gbmV3IENhbnZhcygnc25ha2VCb2FyZCcsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpO1xyXG5jb25zdCBzbmFrZSA9IG5ldyBTbmFrZSgyMCwgJ2RhcmtncmVlbicsICd5ZWxsb3cnKTtcclxuY29uc3Qgc25ha2VHYW1lID0gbmV3IFNuYWtlR2FtZShzbmFrZSwgY2FudmFzKTtcclxuXHJcbnJlZ2lzdGVyRXZlbnRIYW5kbGVycyhzbmFrZUdhbWUpOyJdLCJzb3VyY2VSb290IjoiIn0=