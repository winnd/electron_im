const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// /**
//  * @type {import('webpack').Configuration}
//  */
module.exports = {
    mode: 'development',
    entry: {
        bundle: 'src/renderer/index.ts',
        main: 'src/main/index.ts',
    },
    output: {
        clean: true,
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {name: 'imgs/[hash].[ext]', publicPath: 'dist'},
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [{
                    loader: "file-loader",
                    options: {name: 'front/[hash].[ext]', publicPath: 'dist'},
                }],
            },
        ],
    },
    resolve: {
        alias: {
            'src': path.resolve('src'),
        },
    },
    externals: {
        'electron': `require('electron')`,
    },
    target: 'electron-renderer',
    plugins: [
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            excludeChunks: ['main'],
            template: "src/renderer/index.html",
        }),
    ],
}
