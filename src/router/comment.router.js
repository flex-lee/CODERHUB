const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, reply } = require("../controller/comment.controller");

const commentRouter = new KoaRouter({ prefix: "/comment" });

// 1.增:给动态新增评论
commentRouter.post("/", verifyAuth, create);
// 1.1:增:回复评论
commentRouter.post("/reply", verifyAuth, reply);

module.exports = commentRouter;
