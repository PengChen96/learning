import {loadCSS, loadJS} from "./sourceUtils";

class SandBox {
  constructor({appId, externals}) {
    this.microModules = externals || {};
    this.microWindow = new Proxy(this.microModules, {
      get(target, propKey, receiver) {
        // console.log('get', target, propKey);
        if (Reflect.has(target, propKey)) {
          return Reflect.get(target, propKey);
        }
        if (target[appId] && Reflect.has(target[appId], propKey)) {
          return Reflect.get(target[appId], propKey);
        }
        // 否则兜底到window对象上取值
        return Reflect.get(window, propKey);
      },
      set(target, propKey, value) {
        console.log('set', target, propKey, value);
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
const loadModuleJsAssets = (appId, hosts) => new Promise(async (resolve, reject) => {
  try {
    let {js} = getManifestAssets(appId);
    const loadJsPromise = js.map((file) => {
      return loadJS(`${hosts}/${file}`);
    })
    await Promise.all(loadJsPromise);
    resolve();
  } catch (e) {
    reject(e);
  }
})
const loadModuleCssAssets = (appId, hosts, loadFlag = true) => {
  let cssAssets = [];
  let {css} = getManifestAssets(appId);
  css.forEach((file) => {
    const url = `${hosts}/${file}`;
    cssAssets.push(url);
    if (loadFlag) {
      loadCSS(url);
    }
  })
  return cssAssets;
}

export {
  appConfig,
  loadModuleJsAssets,
  loadModuleCssAssets,
}
