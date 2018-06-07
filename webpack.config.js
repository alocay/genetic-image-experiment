const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src/index.js"),
    output: {
        path: path.join(__dirname, "docs"),
        filename: "bundle.js",
        libraryTarget: 'var',
        library: 'GenAlgo'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [ 'file-loader', 'image-webpack-loader' ]
            }
        ]
    },
    /*plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            inject: 'head'
        })
    ],*/
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.join(__dirname, "docs"),
        port: 8000,
        stats: "minimal"
    }
};