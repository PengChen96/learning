import {sumFun} from "../webpack/output/eg.esm.output";

const fun = () => {
  sumFun(1, 2);
}
fun();

/**
 * tree shaking
 * 1. 需要webpack.config.js配置  optimization: {usedExports: true,}
 * 2. 需要package.json开启"sideEffects": false,
 *
 * 注意： 1. 只有production会真的删除无用代码
 *       2. 有console.log就不会移除
 */
