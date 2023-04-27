const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/errorConstant");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");

// 用户验证中间件
const verifyUser = async (ctx, next) => {
  //  验证客户端传递过来的user的值是否可以存入数据库
  // 1:验证用户名和密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    // 将错误信息传入错误处理函数进行统一处理
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  //2:判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  //   3.执行下一个中间件
  await next();
};

// 用户信息加密中间件
const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body;
  // 2.对密码进行加密
  ctx.request.body.password = md5password(password);
  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
