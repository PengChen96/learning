const path = require('path');

const SpaPlugin = require('./plugin/spa.plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
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
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
      ]
    },
    output: {
      filename: 'sub-app-umd.[chunkhash:10].js',
      path: path.resolve(__dirname, './subApp/output'),
      libraryTarget: 'umd'
    },
    plugins: [
      new SpaPlugin({
        fileName: 'manifest.js',
        entries: [
          "subApp01"
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'sub-app-umd.[chunkhash:10].css'
      })
    ],
    externals
  },
  {
    mode: 'development',
    entry: {
      subApp02: './subApp02/index.js',
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
          // 通过loader postcss去添加css来实现样式隔离的方案
          // use: [MiniCssExtractPlugin.loader, 'css-loader', path.resolve(__dirname, './loader/spa.loader.js')]
        },
      ]
    },
    output: {
      filename: 'sub-app-umd.[chunkhash:10].js',
      path: path.resolve(__dirname, './subApp02/output'),
      libraryTarget: 'umd'
    },
    plugins: [
      new SpaPlugin({
        fileName: 'manifest.js',
        entries: [
          "subApp02"
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'sub-app-umd.[chunkhash:10].css'
      })
    ],
    externals,
    optimization: {
      splitChunks: {
        // chunks(chunk) {
        //   return !/d$/.test(chunk.name);
        // },
        chunks: 'all',
        // name: false,
        // automaticNameDelimiter: '-',
        // minSize: 100 * 1024,
        maxSize: 100 * 1024,
      }
    }
  }
];

