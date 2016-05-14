const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    
    entry: {
        'polyfills': ['./src/polyfills.ts', 'webpack-hot-middleware/client'],
        'vendor': ['./src/vendor.ts', 'webpack-hot-middleware/client'],
        'app': ['./src/main.ts', 'webpack-hot-middleware/client']
    },
    
    output: {
        path: path.join(__dirname),
        publicPath: '/',
        filename: '[name].js'
    },
    
    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: 'tslint'
        }],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'raw!style!css!postcss'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw','postcss','sass']
            }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ];
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        })
    ],
    tslint: {
        emitErrors: false,
        failOnHint: false
    }
};
