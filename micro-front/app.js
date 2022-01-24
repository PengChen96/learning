import React, {useEffect, useRef} from 'react'
// import SubApp, {init, forceInit, render, destroy} from "./subApp/output/sub-app-umd";
import ReactDOM from "react-dom";
import {createApp} from "./subApp/umdIndex";

const subAppModule = createApp('http://127.0.0.1:8000/subApp/output');
export default () => {
  let subAppRef = useRef(null);

  useEffect(() => {
    load_init();
    return () => destroy(subAppRef.current);
  }, []);

  const load_init = async () => {
    window.React = React;
    window.ReactDOM = ReactDOM;
    let module = await subAppModule.require('subApp01');
    console.log(module);
    module.init({id: 'sub-app 01', name: '子应用 01'});
    if (subAppRef.current) {
      module.render(subAppRef.current);
    }
  }

  return <div>
    {/*组件：<SubApp/>*/}
    函数：
    <div ref={subAppRef} id="sub-app"/>
  </div>
}
