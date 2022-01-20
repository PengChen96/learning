const path = require('path');

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
  },
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
      filename: 'sub-app-umd.js',
      path: path.resolve(__dirname, './subApp/output'),
      libraryTarget: 'umd'
    },
    externals: [{
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
    }]
  }
];

