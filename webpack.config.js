const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: process.env.NODE_ENV,
	entry: "./src/ts/index.ts",
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,

					"css-loader",

					{
						loader: "sass-loader",
					},
				],
			},

			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ""],
	},

	output: {
		filename: "app.js",
		path: path.resolve(__dirname, "dist"),
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "app.css",
		}),
	],
};
