const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        script: `./src/assets/js/script.js`,
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist/assets/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
    devtool: 'source-map',
};
