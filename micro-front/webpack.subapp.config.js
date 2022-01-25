const path = require('path');

const SpaPlugin = require('./plugin/spa.plugin');

const externals = [{
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  "react-dom": {
    root: "ReactDOM",
    commonjs2: "react-dom",
    commonjs: "react-dom",
    amd: "react-dom",
  },
}];
module.exports = [
  {
    mode: 'development',
    entry: './subApp/index.js',
    devtool: false,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
      ]
    },
    output: {
      filename: 'sub-app.js',
      path: path.resolve(__dirname, './subApp/output'),
      libraryTarget: 'commonjs2'
    },
    externals
  },
  {
    mode: 'development',
    entry: {
      subApp01: './subApp/index.js',
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
      ]
    },
    output: {
      filename: 'sub-app-umd.[chunkhash:10].js',
      path: path.resolve(__dirname, './subApp/output'),
      libraryTarget: 'umd'
    },
    plugins: [new SpaPlugin({
      fileName: 'manifest.js',
      entries: [
        "subApp01"
      ]
    })],
    externals
  }
];

