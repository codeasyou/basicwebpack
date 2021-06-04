/**
 * 服务器代码
 * 启动服务器指令：node server.js 或者 nodemon(需全局安装 npm i nodemon -g)
 * 访问服务器
 * http://localhost:3000/
 */

const express = require("express");

const app = express();

app.use(express.static('build',{maxAge:1000*3600}));

app.listen(3000);