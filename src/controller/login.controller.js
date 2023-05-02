const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/secret");

class LoginController {
  sign(ctx, next) {
    // 1.获取用户信息
    const { id, name } = ctx.user;

    // 2.颁发令牌token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60, //过期时间为一天
      algorithm: "RS256", //设置算法
    });
    // 3.返回用户信息
    ctx.body = { code: 0, data: { id, name, token } };
  }
  // 测试登录凭证
  test(ctx, next) {
    console.log(ctx.user);
    ctx.body = "身份验证成功~";
  }
}

module.exports = new LoginController();
