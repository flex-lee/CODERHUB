const labelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    // 1.获取标签数据
    const { label } = ctx.request.body;

    // 2.操作数据库
    const result = await labelService.create(label);

    // 3.返回客户端
    ctx.body = {
      code: 0,
      message: "创建标签成功~",
      data: result,
    };
  }

  async list(ctx, next) {
    // 1.获取是第几页列表
    const { page } = ctx.query;

    // 2.操作数据库查询分页
    const result = await labelService.listLimit(page);

    // 3.查询总标签数量
    const [{ labelCount }] = await labelService.count();

    // 将总数量插入result中
    ctx.body = {
      code: 0,
      message: "获取成功~",
      data: {
        content: result,
        labelCount,
      },
    };
  }
}

module.exports = new LabelController();
