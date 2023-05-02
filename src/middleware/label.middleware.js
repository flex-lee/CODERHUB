const labelService = require("../service/label.service");

/**
 * 传入labels时,不确定labels是否有name已经存在label表中
 * 所以需要将labels都保持在label中,获取labels的id
 * 将获取的数据传递给下一个中间件
 * @param {*} ctx 
 * @param {*} next 
 */
const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来的所有labels
  const { labels } = ctx.request.body;

  // 2.判断所有的labels中的name是否已经存在与label表中
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    // 创建一个标签对象
    const labelObj = { name };
    if (result) {
      //获取name对应的label的id然后给标签对象
      labelObj.id = result.id; //=>{name:"kunkun",id:1}
    } else {
      //插入name,并且获取插入之后的id
      const insertResult = await labelService.create(name);
      labelObj.id = insertResult.insertId; //=>{name:"爱情",id:7}
    }
    newLabels.push(labelObj);
  }
  // 3.所有的labels都变成了=>[{name:"kunkun",id:1},{name:"爱情",id:7}]
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
