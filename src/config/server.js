// 通过dotenv获取.env文件常量并导出
const dotenv = require("dotenv");

dotenv.config();

module.exports = { SERVER_PORT } = process.env;
