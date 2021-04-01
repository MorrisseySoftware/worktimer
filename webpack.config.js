const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
            },
            {
                test: /\.html/,
                use: ['html-loader'],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/warning.mp3',
                    to: 'warning.mp3',
                },
            ],
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8888,
    },
}
