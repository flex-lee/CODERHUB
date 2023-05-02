const connection = require("../app/database");

class UserService {
  // !异步函数
  async create(user) {
    // 1.获取用户user
    const { name, password } = user;
    // 2.拼接statement
    const statement = "INSERT INTO `user` (name,password) values (?,?);";
    // 3.执行SQL语句;//! 异步执行成功后返回给调用者
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  // 查询数据库中是否存在该用户名
  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE name=?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }

  // 查询userId在数据库中的头像(avatar)信息
  async queryAvatarWithUserId(userId) {
    const statement = "SELECT * FROM avatar WHERE user_id=?;";
    const [result] = await connection.execute(statement, [userId]);
    //*可能一个用户上传过多张头像,获取数组中最新的/就是最后一张
    return result.pop();
  }
  // 将上传的头像添加到user表中
  async updateUserAvatar(avatarUrl, userId) {
    const statement = "UPDATE user SET avatar_url = ? WHERE id=?;";
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
