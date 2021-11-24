const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: './entry/eg.entry.js',
    output: {
      filename: 'eg.esm.output.js',
      path: path.resolve(__dirname, './output'),
      library: {
        // do not specify a `name` here
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
  },
  {
    mode: 'production',
    entry: './entry/eg.entry.js',
    output: {
      filename: 'eg.basic.output.js',
      path: path.resolve(__dirname, './output'),
      libraryTarget: 'commonjs2'
    },
  }
];
