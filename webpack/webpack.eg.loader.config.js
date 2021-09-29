const path = require('path');

module.exports = {
  mode: 'production',
  entry: './entry/eg.loader.entry.js',
  output: {
    filename: 'eg.loader.output.js',
    path: path.resolve(__dirname, './output'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, './loader/eg.loader.replace.js'),
            options: {
              text: 'hello, webpack loader!',
            },
          }
        ]
      }
    ]
  },
};
