import React, {useEffect, useRef} from 'react'
// import SubApp, {init, forceInit, render, destroy} from "./subApp/output/sub-app-umd";
import {createApp} from "./subApp/umdIndex";

const subAppModule = createApp('http://127.0.0.1:8000/subApp/output');
export default () => {
  let subAppRef = useRef(null);
  // let subAppRef02 = useRef(null);

  useEffect(() => {
    load_init();
    return () => destroy(subAppRef.current);
  }, []);

  const load_init = async () => {
    let module = await subAppModule.require('subApp01');
    module.init({id: 'sub-app 01', name: '子应用 01'});
    if (subAppRef.current) {
      module.render(subAppRef.current);
    }
    // module.init({id: 'sub-app 02', name: '子应用 02'});
    // if (subAppRef02.current) {
    //   module.render(subAppRef02.current);
    // }
  }

  return <div>
    {/*组件：<SubApp/>*/}
    函数：
    <div ref={subAppRef} id="sub-app"/>
    {/*<div ref={subAppRef02} id="sub-app-02"/>*/}
  </div>
}
