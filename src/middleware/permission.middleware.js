const {
  OPERATION_IS_NOT_ALLOWED,
  DATA_IS_NOT_EXISTS,
} = require("../config/errorConstant");
const PermissionService = require("../service/permission.service");

// ! 封装成通用的资源权限(注意需要和数据库名称保持一致)
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的id
  const { id } = ctx.user;
  // 2.获取资源的id和资源名称
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  // 3.先查询判断数据库是否存在该数据
  const dataIsExists = await PermissionService.checkIsExists(
    resourceId,
    resourceName
  );
 
  if (!dataIsExists) {
    return ctx.app.emit("error", DATA_IS_NOT_EXISTS, ctx);
  }

  // 4.查询user的id是否有修改momentId的权限
  const isPermission = await PermissionService.checkPermission(
    resourceId,
    resourceName,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyPermission,
};
