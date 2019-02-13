const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    cache: true,
    entry: './src/App.tsx',
    module: {
        rules: [
            { test: /\.ts(x)?$/, loader: 'ts-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: { disable: true }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './assets/index.html'
        })
    ],
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        disableHostCheck: true,
        historyApiFallback: true,
        port: 3000
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
