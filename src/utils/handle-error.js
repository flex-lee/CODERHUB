const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/errorConstant");

// 错误处理函数
app.on("error", (error, ctx) => {
  let code = 0;
  let message = " ";
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空~";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "该用户名已被注册,请重新注册~";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
