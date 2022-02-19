import React from 'react';
import ReactDOM from "react-dom";
import {loadJS} from "../utils/sourceUtils"
import {appConfig, loadModuleCssAssets, loadModuleJsAssets} from "../utils/spaUtils";

export const createApp = (hosts, options) => {

  hosts = hosts || 'http://127.0.0.1:8000';
  let manifestUrl = `${hosts}/manifest.js`;

  const externals = {
    React: React,
    ReactDOM: ReactDOM
  }
  return {
    async require(appId) {
      let {microModules} = appConfig(appId, externals);
      await loadJS(manifestUrl);
      await loadModuleJsAssets(appId, hosts);
      let cssAssets = loadModuleCssAssets(appId, hosts, false);
      console.table(window.__SPA__);
      console.log(appId, '加载模块暴露的方法', microModules[appId]);
      // window.__SPA__[appId] = microModules[appId];
      microModules[appId].cssAssets = cssAssets; // 在shadow方案中，module.render方法中需要传递这个cssAssets
      return microModules[appId];
    }
  }

}
