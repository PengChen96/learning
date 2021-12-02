/**
 loader：负责文件转换（webpack只能理解js和json文件）
 本质是一个函数，对接受到的内容进行转换，返回转换后的结果（返回值必须是JS代码字符串）；
 规则：顺序调用每一个loader，上一个调用返回的内容会作为下一个loader的入参；
 扩展：loader中的this上下文由webpack提供，指向了一个叫loaderContext的loader-runner特有对象
 */

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './entry/eg.entry.js',
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
