module.exports = {
    entry: "./example.js",
    output: {
        path: './',
        filename: "bundle.js",
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jsx-loader?harmony'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    }
};