const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router");

// 1.创建app
const app = new Koa();

app.use(bodyParser());
// 使用自动化动态函数注册路由
registerRouters(app);


// 导出app
module.exports = app;
