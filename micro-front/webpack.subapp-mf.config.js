const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './subAppMF/src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3002,
  },
  output: {
    path: path.resolve(__dirname, './subAppMF/output'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'subAppMF',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './subAppMF/src/App',
      },
      // shared: { react: { singleton: true, eager: true }, 'react-dom': { singleton: true, eager: true } },
    }),
    new HtmlWebpackPlugin({
      template: './subAppMF/public/index.html',
    }),
  ],
};
