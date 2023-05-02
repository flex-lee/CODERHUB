const KoaRouter = require("@koa/router");
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 编写接口
// 1.增:新增动态(发表动态)
momentRouter.post("/", verifyAuth, create);
// 2.查:查询动态列表(列表/id)
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
// 3.删:删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
// 4.改:修改动态
// 验证:登录的用户才能修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 5.添加标签:
/**
 * 中间件:
 * 1.是否登录
 * 2.验证是否有操作这个动态的权限
 * 3.额外中间件,验证label的name是否已经存在于label表中
 *    如果存在,那么直接使用即可
 *    如果没有存在,那么需要先将label的name添加到label表中
 * 4.最终步骤:
 *    所有的labels都在已经在label表中
 *    动态*,和labels 关系,添加到关系表中
 */
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
