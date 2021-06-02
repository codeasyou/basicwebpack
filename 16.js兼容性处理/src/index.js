//处理全部的js兼容性问题，包括promise等。
//注意：如果使用 core-js 按需加载的方案，就不能再使用此方案
//import "@babel/polyfill";

const add = (x, y) =>{
    debugger;
	return x + y;
};

console.log(add(2,6));

const promise = new Promise(resolve=>{
	setTimeout(()=>{
		console.log("定时器执行完了~~~");
		resolve();
	},1000)
});

console.log(promise)