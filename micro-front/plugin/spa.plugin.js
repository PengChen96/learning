const uglifyJs = require('uglify-js');

class SpaPlugin {
  static defaultOptions = {
    fileName: 'manifest.js',
    entries: 'all'
  }

  constructor(options = {}) {
    this.options = {...SpaPlugin.defaultOptions, ...options};
  }

  genCode(code) {
    return `
      (function (root, factory) {
        if (typeof exports === 'object' && typeof module === 'object') {
          module.exports = factory();
        } else {
          root.__SPA__ = root.__SPA__ || {};
          root.__SPA__.manifest = factory();
        }
      })(self, function () {
        return ${code};
      });
    `;
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

      const {entrypoints} = compilation;
      const assetsManifest = this.getAssetsManifest(entrypoints);
      const manifest = this.getClassifyManifest(assetsManifest);
      let code = this.genCode(JSON.stringify(manifest));
      code = uglifyJs.minify(code).code;
      compilation.assets[this.options.fileName] = {
        source: () => code,
        size: () => code.length
      };

    })
  }

  getAssetsManifest(entrypoints) {
    const manifest = {};
    let {entries} = this.options;
    if (entries === 'all') {
      entries = [...entrypoints.keys()];
    }
    entries.forEach(entry => {
      const entrypoint = entrypoints.get(entry);
      let files = [];
      if (entrypoint) {
        entrypoint.chunks.forEach((chunk) => {
          files.push(...chunk.files);
        });
      }
      manifest[entry] = files;
    });
    return manifest;
  }

  getClassifyManifest(assetsManifest) {
    let manifest = {};
    Object.keys(assetsManifest).forEach(entry => {
      const assets = assetsManifest[entry];
      manifest[entry] = {
        js: assets.filter(asset => /\.js$/.test(asset)),
        css: assets.filter(asset => /\.css$/.test(asset))
      };
    });
    return manifest;
  }

}

module.exports = SpaPlugin;
