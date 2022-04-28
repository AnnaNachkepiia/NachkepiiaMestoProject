const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //Подключение CSS
const HtmlWebpackPlugin = require('html-webpack-plugin'); //подключение HTML
const path = require('path'); // подключаем path к конфигу вебпак

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }, ],
    },
}