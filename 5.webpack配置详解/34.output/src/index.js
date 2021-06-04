

import count from "./count"

console.log('index.js 文件被加载了');

console.log(count(51,10));

import("./add")
    .then(({/*重命名add */default:add})=>{
        console.log(add(4,789));
        
    })
    .catch(()=>{
        console.log('引入失败~~');
        
    })
