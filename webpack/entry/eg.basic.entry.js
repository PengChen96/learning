import {minsFun, sumFun} from "./eg.entry";

sumFun(1, 2);
sumFun(3, 4);
minsFun(5, 6);

import('./eg.entry').then((res) => {
  res.sumFun(6, 6);
})

console.log('自动执行');
export const test = () => {
  console.log('test');
}
