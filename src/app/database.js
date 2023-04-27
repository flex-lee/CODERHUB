// 创建数据库连接
const mysql = require("mysql2");

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: "3306",
  database: "coderhub",
  user: "root",
  password: "leefix1998.",
  connectionLimit: 5,
});
// 2.获取连接是否成功
connectionPool.getConnection((err,connection)=>{
    // 1.判断是否有错误信息
    if (err) {
        console.log('获取连接失败~',err)
        return
    }
    // 2.获取connection,尝试和数据库建立一下连接
    connection.connect((err)=>{
        if (err) {
            console.log("和数据库交互失败",err)
        }else{
            console.log("和数据库连接成功,可以进行数据库操作~")
        }
    })

})

// 3.创建连接池中连接对象(promise)
const connection = connectionPool.promise();

// 3.对创建好的promise进行导出
module.exports = connection;
