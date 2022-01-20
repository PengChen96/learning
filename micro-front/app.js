import React, {useEffect, useRef} from 'react'
// import SubApp, {init, forceInit, render, destroy} from "./subApp/output/sub-app-umd";
import {loadJS} from "./utils/sourceUtils"
// import ReactDOM from "react-dom";

export default () => {
  let subAppRef = useRef(null);

  useEffect(() => {
    load_init();
    return () => destroy(subAppRef.current)
  }, []);

  const load_init = () => {
    window.React = React;
    window.ReactDOM = ReactDOM;
    loadJS('http://127.0.0.1:8000/subApp/output/sub-app-umd.js').then(() => {
      init({id: 'sub-app 01', name: '子应用 01'});
      if (subAppRef.current) {
        render(subAppRef.current);
      }
    })
  }

  return <div>
    {/*组件：<SubApp/>*/}
    函数：
    <div ref={subAppRef} id="sub-app"/>
  </div>
}
