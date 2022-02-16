const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  // devtool: 'source-map',
  devServer: {
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      remotes: {
        // subAppMF: "subAppMF@[subAppMFUrl]/remoteEntry.js",
        // subAppMF: "subAppMF@http://localhost:3002/remoteEntry.js",
        subAppMF: "subAppMF@http://127.0.0.1:8000/subAppMF/output/remoteEntry.js",
      },
      // shared: { react: { singleton: true, eager: true }, 'react-dom': { singleton: true, eager: true } },
    }),
    new ExternalTemplateRemotesPlugin(),
    new htmlWebpackPlugin({
      template: './public/index.html'
    }),
  ],
};
