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
}

module.exports = new UserService();
