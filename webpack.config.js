const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {minimizerPlugin} = require("html-loader/dist/plugins");

module.exports = {
    mode: 'development',
    entry: {
        index: './src/script/index.js',
        burger: './src/script/burger_menu.js',
// Можно добавлять js файлы
    },
    devServer: {
        port:5000,
        open:true,
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: "[name].[contenthash].js",
        assetModuleFilename: "other/[name][ext]"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: "asset/resource",
            },
        ]
    }
};