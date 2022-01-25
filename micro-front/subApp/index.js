import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

const SubApp = (props) => {
  console.log('渲染<SubApp>组件');
  useEffect(() => {
    console.log('useEffect props', props);
  }, [props.id, props.name]);
  return <div>
    sub-app {props.name}
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
export {
  init,
  forceInit,
  render,
  destroy
}
export default SubApp;
