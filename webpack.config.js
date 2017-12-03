const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConfig = {
    output: {
        path: path.resolve(__dirname + '/dist/'),
        filename: 'vue-receipt-component.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!less!css'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
            }
        })
    ],
    externals: {
        vue: 'vue',
    }
};

module.exports = [
    merge(commonConfig, {
        entry: path.resolve(__dirname + '/src/receipt/plugin.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vue-receipt-component.min.js',
            libraryTarget: 'window',
            library: 'VueReceiptComponent'
        }
    }),
    merge(commonConfig, {
        entry: path.resolve(__dirname + '/src/receipt/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vue-receipt-component.js',
            libraryTarget: 'umd',
            library: 'vue-receipt-component',
            umdNamedDefine: true
        }
    })
];
