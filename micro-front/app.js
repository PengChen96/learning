import React, {Suspense, useEffect, useRef} from 'react'
// import SubApp, {init, forceInit, render, destroy} from "./subApp/output/sub-app-umd";
import {createApp} from "./subApp/umdIndex";

const subAppModule = createApp('http://127.0.0.1:8000/subApp/output');
const subApp02Module = createApp('http://127.0.0.1:8000/subApp02/output');
const RemoteApp = React.lazy(() => import("subAppMF/App"));
export default () => {
  let subAppRef = useRef(null);
  let subApp02Ref = useRef(null);

  useEffect(async () => {
    await initSubApp01();
    await initSubApp02();
    return () => {
      destroy(subAppRef.current);
      destroy(subApp02Ref.current);
    }
  }, []);

  const initSubApp01 = async () => {
    let module = await subAppModule.require('subApp01');
    module.init({id: 'sub-app 01', name: '子应用 01'});
    if (subAppRef.current) {
      module.render(subAppRef.current);
    }
  }
  const initSubApp02 = async () => {
    let module = await subApp02Module.require('subApp02');
    module.init({id: 'sub-app 02', name: '子应用 02'});
    if (subApp02Ref.current) {
      module.render(subApp02Ref.current);
    }
  }

  return <div>
    {/*组件：<SubApp/>*/}
    函数：
    <div ref={subAppRef} id="sub-app"/>
    <div ref={subApp02Ref} id="sub-app-02"/>
    <Suspense fallback={"loading..."}>
      <RemoteApp/>
    </Suspense>
  </div>
}
