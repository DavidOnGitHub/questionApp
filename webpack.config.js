module.exports = {
    entry: './index.tsx',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.jsx', '.js', '.ts', '.tsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            }
        ]
    }
};