class SpaPlugin {
  static defaultOptions = {
    fileName: 'manifest.js'
  }
  constructor(options = {}) {
    this.options = { ...SpaPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = SpaPlugin.name;

    compiler.hooks.done.tap(
      pluginName,
      (
        stats /* 绑定 done 钩子后，stats 会作为参数传入。 */
      ) => {
        console.log('Hello World!', /*stats*/);
        console.log(this.options.fileName, pluginName);
      }
    );
    compiler.hooks.emit.tapPromise(pluginName, async (compilation) => {

      compilation.assets[this.options.fileName] = {
        source: () => "content",
        size: () => 7
      };

    })
  }
}

module.exports = SpaPlugin;
