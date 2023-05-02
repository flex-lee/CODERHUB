const KoaRouter = require("@koa/router");
const { create, list } = require("../controller/label.controller");
const {verifyAuth}=require("../middleware/login.middleware")

const labelRouter = new KoaRouter({ prefix: "/label" });
// 创建标签(新增)
labelRouter.post("/",verifyAuth,create)
// 标签列表(支持换一批操作)
labelRouter.get("/",list)

module.exports = labelRouter;
