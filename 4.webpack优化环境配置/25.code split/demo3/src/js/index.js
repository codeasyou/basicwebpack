

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3,4,5,6));

/***
 * 通过 js 代码，让某个文件被单独打包成一个chunk
 * import 动态导入语法：能将某个文件单独打包
 *  给单独打包出来的文件取个名字
 */

import(/*webpackChunkName:'test'*/"./test").then(({mul,count})=>{
  console.log("文件加载成功~~~");
  console.log(mul(2,5));
}).catch(()=>{
  console.log("文件加载失败~~~");
})

