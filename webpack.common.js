const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.tsx',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Soundboard',
            template: './src/index.ejs',
        }),
    ],
};
