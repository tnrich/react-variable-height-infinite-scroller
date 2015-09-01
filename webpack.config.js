module.exports = {
  entry: './example.js',
  output: {
    path: './',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
