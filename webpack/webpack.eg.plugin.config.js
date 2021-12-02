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

/**
 plugin：负责功能扩展（打包优化、压缩等）
 1.webpack是基于发布订阅模式，在运行生命周期中会广播出很多事件，plugin通过监听这些事件，在特定阶段执行插件任务，从而实现想要的功能；
 （webpack的事件机制基于webpack自己实现的一套Tapable事件流方案 github ）
 2.webpack两个核心对象
 compiler：暴露了和 webpack整个生命周期相关的钩子（compiler-hooks）
 compilation：暴露了与模块和依赖有关的粒度更小的事件钩子（Compilation Hooks）
 */
