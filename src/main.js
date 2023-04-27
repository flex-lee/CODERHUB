// 1.导入app
const app = require("./app");
const { SERVER_PORT } = require("./config/server");
// 导入执行工具函数
require("./utils/handle-error");

app.listen(SERVER_PORT, () => {
  console.log(`coderhub服务器启动成功,端口${SERVER_PORT}~`);
});
