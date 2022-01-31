import {loadCSS, loadJS} from "../utils/sourceUtils"
import React from 'react';
import ReactDOM from "react-dom";

export const createApp = (hosts, options) => {

  hosts = hosts || 'http://127.0.0.1:8000';
  let manifestUrl = `${hosts}/manifest.js`;

  const appConfig = (appId) => {
    const microModules = {
      React: React,
      ReactDOM: ReactDOM
    }
    const microWindow = new Proxy(microModules, {
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
    window.__SPA__ = window.__SPA__ || {};
    window.__SPA__.fakeWindow = {
      window: microWindow,
      self: microWindow,
    }
    window.__SPA__.modules = microModules;
    return microModules;
  }

  return {
    async require(id) {
      let modules = appConfig(id);
      await loadJS(manifestUrl);
      let {js, css} = window.__SPA__.manifest[id];
      css.forEach((file) => {
        loadCSS(`${hosts}/${file}`);
      })
      const loadJsPromise = js.map((file) => {
        return loadJS(`${hosts}/${file}`);
      })
      await Promise.all(loadJsPromise);
      console.table(window.__SPA__);
      console.log('加载模块暴露的方法', modules[id]);
      return modules[id];

    }
  }

}
