const jwt = require("jsonwebtoken");
// 引入常量
const error = require("../config/errorConstant");
const { PUBLIC_KEY } = require("../config/secret");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //  1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", error.NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //  2.查询该用户是否在数据库中
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", error.NAME_IS_NOT_EXISTS, ctx);
  }
  // 3.查询数据库中密码与用户传递是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", error.PASSWORD_IS_INCORRECT, ctx);
  }
  //  4.将user对象保存到ctx中
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", error.UN_AUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.验证token是否有效
  try {
    // 2.1获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    // 2.2将token的信息保存下来
    ctx.user = result;
    // 2.3执行下一个中间件
    await next();
  } catch (err) {
    console.log(err)
    // 判断错误类型,第一个是token错误,第二个是token过期 统一返回
    if (err.name === "JsonWebTokenError" || err.name==="TokenExpiredError") {
      ctx.app.emit("error", error.UN_AUTHORIZATION, ctx);
    }else if(err.name==="MulterError"){  //由于文件上传这里用了鉴权,所以错误这里也会抛出进行判断
     if (err.code==="LIMIT_FILE_COUNT") {
      ctx.app.emit("error",error.IS_NOT_SINGLE_FILE,ctx)
     }
    }
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
