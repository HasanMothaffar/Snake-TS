# Snake - TypeScript version

The TypeScript version has finally made it! 

> Favicons are provided by https://icons.iconarchive.com.

## Getting Started

### Installation

To get this project up and running on your local machine, follow these steps:

1. Clone the repository
	```sh
	git clone https://github.com/HasanMothaffar/Snake-TS.git
	```

2. Install the required dependencies using yarn or npm
	```sh
	yarn install
	or
	npm install
	```
3. Spin up a local development server either through webpack or [VSCode's Liver Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

4. Enjoy the game!

### Compilation

In order to compile the source TypeScript and SCSS files into, run the following snippet in your terminal:

```sh
yarn run build
# or
npm run build
```

This will generate the ```dist``` folder, which contains all the required files to run the project in the browser.

**Note:** You can also run ```yarn run watch``` to compile files in watch mode.

## New Features:
- Difficuly selection.

- Mobile support! There's now a basic touch pad that simulates keyboard arrows.

- Sound effects for when the snake eats a piece of food.