import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
// import SubAppChild from "./SubAppChild";
import "./index.css";

const SubApp = (props) => {
  console.log('渲染<SubApp>组件');
  useEffect(() => {
    console.log('useEffect props', props);
  }, [props.id, props.name]);
  return <div className="sub-app-container">
    sub-app {props.name}
    {/*<SubAppChild/>*/}
  </div>
}

const config = {};
const init = (params) => {
  config.id = params.id || 'sub-app';
  config.name = params.name || 'sub-app 子应用';
  console.log('执行init方法:', config);
}
const forceInit = (params) => {
  Object.assign(config, params);
  console.log('执行forceInit方法:', config);
}
const render = (el, props) => {
  console.log('执行render方法:', el);
  if (typeof el === 'string') el = document.getElementById(el);
  ReactDOM.render(<SubApp {...config} {...props}/>, el);
}
const destroy = (el) => {
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
    ReactDOM.render(null, el);
  }
}
const flag = 'subApp02';
export {
  init,
  forceInit,
  render,
  destroy,
  flag
}
export default SubApp;
