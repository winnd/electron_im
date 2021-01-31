const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

/**
 * @type {webpack.Configuration}
 */
module.exports = {
    mode:    'development',
    entry:   path.resolve(__dirname, 'index.js'),
    output:  {
        filename: 'bundle.js',
        path:     path.resolve(__dirname, '../../dist'),
    },
    module:  {
        rules: [{
            test:   /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.scss$/,
            use:  ['style-loader', 'css-loader', 'sass-loader'],
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            use:  [{
                loader:  'file-loader',
                options: {
                    name:       'imgs/[hash].[ext]',
                    publicPath: 'dist',
                },
            }],
        }],
    },
    resolve: {
        alias: {
            'src': path.resolve('src'),
        },
    },
    plugins: [new VueLoaderPlugin()],
}
