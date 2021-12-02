import {sumFun} from "../webpack/output/eg.esm.output";

const fun = () => {
  sumFun(1, 2);
}
fun();

/**
 * tree shaking: 基于ES2015模块语法的静态结构特性，最早是由rollup提出的概念
 * 配置：
 * 1. 需要webpack.config.js配置  optimization: {usedExports: true,}
 * 2. 需要package.json开启"sideEffects": false, 可以通过设置["*.css"],跳过整个模块/文件和整个文件子树,不进行移除
 *
 * 注意： 1. 只有production会真的删除无用代码
 *       2. 有console.log就不会移除
 */
