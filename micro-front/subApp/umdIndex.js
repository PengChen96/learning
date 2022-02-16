import React from 'react';
import ReactDOM from "react-dom";
import {loadJS} from "../utils/sourceUtils"
import {appConfig, loadModuleAssets} from "../utils/spaUtils";

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
      await loadModuleAssets(appId, hosts);
      console.table(window.__SPA__);
      console.log(appId, '加载模块暴露的方法', microModules[appId]);
      // window.__SPA__[appId] = microModules[appId];
      return microModules[appId];
    }
  }

}
