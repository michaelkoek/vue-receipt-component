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
                loader: 'babel',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: 'style!less!css'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin( {
            minimize : true,
            sourceMap : false,
            mangle: true,
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + '/src/receipt/plugin.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'vue-receipt-component.min.js',
            libraryTarget: 'window',
            library: 'VueReceiptComponent'
        }
    }),
    merge(config, {
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
