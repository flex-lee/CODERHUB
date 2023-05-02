const fileService = require("../service/file.service");
const userService = require("../service/user.service");

// 图片文件地址
const {SERVER_HOST,SERVER_PORT}= require("../config/server")

class FileController {
  async create(ctx, next) {
    // 1.获取信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;

    // 2.将数据和id结合进行存储
    const result = await fileService.create(filename, mimetype, size, id);

    // 3.将上传的头像地址信息同步保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    const result2 = await userService.updateUserAvatar(avatarUrl, id);
    // 4.返回结果
    ctx.body = {
      code: 0,
      message: "头像上传成功,可以查看~",
      data: avatarUrl,
    };
  }
}

module.exports = new FileController();
(ctx, next) => {
  console.log(ctx.file);
  ctx.body = "文件上传成功~";
};
