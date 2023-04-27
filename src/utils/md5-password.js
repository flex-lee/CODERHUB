const crypto = require("crypto");

// 对密码进行md5加密并转为16进制
function md5password(password) {
  const md5 = crypto.createHash("md5");
  //使用md5加密
  md5.update(password);
  //   返回加密后的密码并转为16进制
  return md5.digest("hex");
}

module.exports = md5password;
