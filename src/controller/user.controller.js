const userService = require("../service/user.service");

// 执行控制器
class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body;
    
    /**@将这部分代码单独分离出去
     * 
     * // 2. 验证客户端传递过来的user的值是否可以存入数据库
    // 2.1:验证用户名和密码是否为空
    const { name, password } = user;
    if (!name || !password) {
      ctx.body = {
        code: -1001,
        message: "用户名或密码不能为空~",
      };
      return;
    }

    //2.2:判断name是否在数据库中已经存在
    const users = await userService.findUserByName(name);
    console.log(users)
    if (users.length) {
      ctx.body = {
        code: -1002,
        message: "该用户名已被注册,请重新注册~",
      };
      return
    }
     */

    // 3.将user信息存储到数据库中
    //!异步执行需要先确认存储成功再返回结果
    const res = await userService.create(user);

    // 4.查看存储的结果,告知前端创建成功;
    ctx.body = {
      message: "创建成功~",
      data: res,
    };
  }
}

module.exports = new UserController();
