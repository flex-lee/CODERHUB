const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UN_AUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
  DATA_IS_NOT_EXISTS,
  FAILED_TO_ADD_MOMENT_LABEL,
  IS_NOT_SINGLE_FILE,
  AVATAR_IS_NOT_EXISTS,
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
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = "该用户不存在,请检查用户名后重新尝试~";
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004;
      message = "输入的密码错误,请检查后再尝试~";
      break;
    case UN_AUTHORIZATION:
      code = -1005;
      message = "无效的token或者token已经过期~";
      break;
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001;
      message = "没有操作该资源的权限~";
      break;
    case DATA_IS_NOT_EXISTS:
      code = -2002;
      message = "该数据不存在或已被删除~";
      break;
    case FAILED_TO_ADD_MOMENT_LABEL:
      code = -3001;
      message = "为动态添加标签失败,请检查数据是否有问题~";
      break;
    case IS_NOT_SINGLE_FILE:
      code = -5001;
      message = "上传文件失败,该接口只能上传单文件~";
      break;
    case AVATAR_IS_NOT_EXISTS:
      code = -6001;
      message = "该用户头像文件不存在~";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
