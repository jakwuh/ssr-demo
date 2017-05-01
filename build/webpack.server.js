const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const {resolve} = require('path');

module.exports = {
    entry: './src/entries/server.js',
    target: 'node',
    output: {
        path: resolve(__dirname, '../dist/server/'),
        publicPath: 'dist/',
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                loader: 'null-loader'
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
        new webpack.DefinePlugin({
            IS_SERVER: true,
            IS_CLIENT: false
        })
    ]
};
