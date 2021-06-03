
console.log("index.js 文件被加载了~~~");

// import { mul } from "./test"
//webpackPrefetch:true 预加载


document.getElementById("btn").onclick = function(){
  //懒加载  当文件需要使用时才加载~ 文件比较大时，不太适合。兼容性还可以
  import(/*webpackChunkName:'test' */"./test").then(({mul})=>{
    console.log(mul(2,6));
  })

  //正常加载可以认为是并行加载（同一时间加载多个文件），

  //预加载 webpackPrefetch 会在使用之前，提前加载 js 文件；预加载 webpackPrefetch ：等其他资源加载完毕，浏览器空闲了，再偷偷加载
  // 兼容性较差 哈哈~~ 慎用
  import(/*webpackChunkName:'test',webpackPrefetch:true */"./test").then(({mul})=>{
    console.log(mul(2,6));
  })
}
