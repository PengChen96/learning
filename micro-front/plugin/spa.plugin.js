const uglifyJs = require('uglify-js');
const webpackSources = require('webpack-sources');

const SPA = '__SPA__';

class SpaPlugin {
  static defaultOptions = {
    fileName: 'manifest.js',
    entries: 'all',
    enableFakeCommonJS: true,
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
          root.__SPA__.defineManifest(factory());
        }
      })(self, function () {
        return ${code};
      });
    `;
  }

  genWithExprFakeCommonJsStart() {
    return `with (typeof ${SPA} === 'object' ? ${SPA}.fakeWindow : {}) {\n\n`;
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
    compiler.hooks.compilation.tap(pluginName, compilation => {
      // 注入commonJS
      if (this.options.enableFakeCommonJS) {
        this.injectFakeCommonJS(compilation, compiler);
      }

    })
  }

  injectFakeCommonJS(compilation, compiler) {
    const pluginName = SpaPlugin.name;
    const {webpack} = compiler;
    const {Compilation} = webpack;
    compilation.hooks.processAssets.tapAsync({
      name: pluginName,
      stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
    }, (assets, callback) => {
      Object.entries(assets).forEach(([pathname, source]) => {
        const assetInfo = compilation.assetsInfo.get(pathname);
        if (/\.js$/.test(pathname)) {
          compilation.assets[pathname] = new webpackSources.ConcatSource(
            // with 语句头部
            new webpackSources.OriginalSource(this.genWithExprFakeCommonJsStart(), `${pluginName}/fakeCommonJSWithExpressionStart`),
            // 原始代码新增2格缩进
            new webpackSources.PrefixSource('  ', source),
            // with 语句底部
            new webpackSources.OriginalSource('\n\n}\n', `${pluginName}/fakeCommonJSWithExpressionEnd`)
          );
        }
      });
      callback();
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
