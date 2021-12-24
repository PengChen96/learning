const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './entry/eg.basic.entry.js',
    devtool: false,
    output: {
      filename: 'eg.basic.output.js',
      path: path.resolve(__dirname, './output'),
      libraryTarget: 'commonjs2'
    },
  }
];

/*
* 问题：
*   1. webpack把代码编译成了什么？  立即执行函数
* */
