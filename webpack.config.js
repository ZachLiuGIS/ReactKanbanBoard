var path = require('path');
//var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry:  ["./src/main.js"],
    output: {
        path: __dirname + "/dist/js",
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }]
    }
};