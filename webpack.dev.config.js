var webpack = require('webpack');
var path = require('path');
var process = require('process');
process.traceDeprecation = true;

//var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&noInfo=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: "dev",
    devtool:"source-map",
    entry: {
        app: [path.join(__dirname, "src", "entry.js")],
        demo: [path.join(__dirname, "src", "demo.js")]
    },
    output: {
        path: path.resolve(__dirname, "dev"),
        publicPath: "/", //资源文件引用的目录
        filename: "[name].bundle.js"
    },
    devServer: {
        hot: false, // Tell the dev-server we're using HMR
        contentBase: path.resolve(__dirname, "dev"),
        publicPath: '/',
        noInfo: false,
        port: 3000,
        host: '0.0.0.0',
        watchContentBase: true
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/asset/index.html',
            favicon: './src/asset/favicon.ico',
            hash:true,
            excludeChunks: ['demo']
        }),
        new HtmlWebpackPlugin({
            filename: 'demo.html',
            template: './src/asset/demo.html',
            favicon: './src/asset/favicon.ico',
            hash:true,
            excludeChunks: ['app']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ],
    module: {
        rules: [
            { // Disable webpack-dev-server's auto-reload feature in the browser.
                test: path.resolve(__dirname, 'node_modules/webpack-dev-server/client'),
                loader: 'null-loader'
            },
            {test: /\.jpg$/, use: ["file-loader?name=images/[name].[ext]"]},
            {test: /\.png$/, use: ["url-loader?name=images/[name].[ext]&limit=8192"]},
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                }]

            }

        ]
    }
}