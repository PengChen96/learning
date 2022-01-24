import {loadJS} from "../utils/sourceUtils"

export const createApp = (hosts, options) => {

  hosts = hosts || 'http://127.0.0.1:8000';
  let manifestUrl = `${hosts}/manifest.js`;

  return {
    async require(id) {
      await loadJS(manifestUrl).then(() => {
        console.log(window.__SPA__);
      });
      let {js} = window.__SPA__.manifest[id];
      const loadJsPromise = js.map((file) => {
        return loadJS(`${hosts}/${file}`);
      })
      await Promise.all(loadJsPromise)
      console.log(loadJsPromise, window.init);
      // let module = await spa.requireApp(id);
      return {
        init,
        forceInit,
        render,
        destroy
      };

    }
  }

}
