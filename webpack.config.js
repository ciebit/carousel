module.exports = {
    entry: {
        "main": './example/source/index.ts'
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        path: __dirname + '/example/public/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}
