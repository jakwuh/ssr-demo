const webpack = require('webpack');
const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/entries/client.js',
    target: 'web',
    devtool: 'source-map',
    output: {
        path: resolve(__dirname, '../dist/client/'),
        publicPath: 'dist/',
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                browsers: ['last 2 versions']
                            }
                        }]
                    ]
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            IS_CLIENT: true,
            IS_SERVER: false
        })
    ]
};
