import {loadCSS, loadJS} from "./sourceUtils";

class SandBox {
  constructor({appId, externals}) {
    this.microModules = externals || {};
    this.microWindow = new Proxy(this.microModules, {
      get(target, propKey, receiver) {
        if (Reflect.has(target, propKey)) {
          return Reflect.get(target, propKey);
        }
        // 否则兜底到window对象上取值
        return Reflect.get(window, propKey);
      },
      set(target, propKey, value) {
        target[appId] = target[appId] || {};
        Reflect.set(target[appId], propKey, value);
        return true;
      }
    })
  }
}

const appConfig = (appId, externals) => {
  // const externals = {
  //   React: React,
  //   ReactDOM: ReactDOM
  // }
  let sandBox = new SandBox({appId, externals});
  window.__SPA__ = window.__SPA__ || {};
  window.__SPA__.fakeWindow = {
    window: sandBox.microWindow,
    self: sandBox.microWindow,
  }
  // window.__SPA__.modules = sandBox.microModules;
  window.__SPA__.defineManifest = defineManifest;
  console.log('sandBox.microModules', appId, sandBox.microModules);
  return sandBox;
}

const defineManifest = (manifestAssets) => {
  const manifest = window.__SPA__.manifest || {};
  window.__SPA__.manifest = Object.assign(manifest, manifestAssets);
  ;
}
const getManifestAssets = (appId) => {
  return window.__SPA__.manifest[appId];
}
const loadModuleAssets = (appId, hosts) => new Promise(async (resolve, reject) => {
  try {
    let {js, css} = getManifestAssets(appId);
    css.forEach((file) => {
      loadCSS(`${hosts}/${file}`);
    })
    const loadJsPromise = js.map((file) => {
      return loadJS(`${hosts}/${file}`);
    })
    await Promise.all(loadJsPromise);
    resolve();
  } catch (e) {
    reject(e);
  }
})

export {
  appConfig,
  loadModuleAssets
}
