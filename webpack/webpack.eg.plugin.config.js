const path = require('path');

const HelloWorldPlugin = require('./plugin/eg.plugin.hello');
module.exports = {
  mode: 'production',
  entry: './entry/eg.entry.js',
  output: {
    filename: 'eg.plugin.output.js',
    path: path.resolve(__dirname, './output'),
    libraryTarget: 'commonjs2'
  },
  plugins: [new HelloWorldPlugin({options: true})],
};
