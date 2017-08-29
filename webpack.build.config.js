var webpack = require('webpack');
var path = require('path');

//var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&noInfo=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: "dev",
    entry: {
        app: [path.join(__dirname, "src", "entry.js")]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/", //资源文件引用的目录
        filename: "[name].bundle.min.js"
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/asset/index.html',
            favicon: './src/asset/favicon.ico',
            hash:true
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false,
                //screw_ie8 : false
            },
            comments: false,
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

