const fs = require("fs");
const { AVATAR_IS_NOT_EXISTS } = require("../config/errorConstant");
const { UPLOAD_PATH } = require("../config/pathConstant");
const userService = require("../service/user.service");

// 执行控制器
class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body;

    // 3.将user信息存储到数据库中
    //!异步执行需要先确认存储成功再返回结果
    const res = await userService.create(user);

    // 4.查看存储的结果,告知前端创建成功;
    ctx.body = {
      message: "创建成功~",
      data: res,
    };
  }
  // 展示用户头像
  async showAvatarImage(ctx, next) {
    // 1.获取用户的id
    const { userId } = ctx.params;

    // 2.查询获取userId对应的头像信息
    const avatarInfo = await userService.queryAvatarWithUserId(userId);
    //* 判断是否存在数据,不存在返回对应错误
    if (!avatarInfo) {
      return ctx.app.emit("error",AVATAR_IS_NOT_EXISTS,ctx)
    }
    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    //* 浏览器不知道是什么类型会进行下载,这里给一个类型
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new UserController();
