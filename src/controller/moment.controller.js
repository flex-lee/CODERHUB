const { FAILED_TO_ADD_MOMENT_LABEL } = require("../config/errorConstant");
const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1.获取动态的内容
    const { content } = ctx.request.body;

    // 2.动态由谁发布(token=>id/name)
    const { id } = ctx.user;

    // 3.将动态相关的数据保存到数据库
    const result = await momentService.create(content, id);

    ctx.body = {
      code: 0,
      message: "创建用户动态成功~",
      data: result,
    };
  }

  async list(ctx, next) {
    // 获取查询 分页
    const { offset, size } = ctx.query;
    // 从数据库查询列表
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    };
  }

  async detail(ctx, next) {
    // 1.获取动态id
    const { momentId } = ctx.params;

    // 2.根据id查询动态详情
    const result = await momentService.queryById(momentId);

    // 返回查询结果
    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async remove(ctx, next) {
    // 1.获取删除的id
    const { momentId } = ctx.params;

    // 2.执行数据库的删除操作
    const result = await momentService.remove(momentId);

    ctx.body = {
      code: 0,
      message: "删除成功~",
      data: result,
    };
  }

  async update(ctx, next) {
    // 1.获取修改的id和修改的内容
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 2.数据库查询需要修改的id并且修改内容
    const result = await momentService.updateContent(momentId, content);

    ctx.body = {
      code: 0,
      message: "修改成功~",
      data: result,
    };
  }

  // 为moment添加label
  async addLabels(ctx, next) {
    // 1.获取参数
    const labels = ctx.labels;
    const { momentId } = ctx.params;

    // 2.将moment_id和label_id添加到moment_label关系表
    try {
      for (const label of labels) {
        // 2.1.判断label_id是否已经和moment_id已经存在该数据
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          // 2.2如果不存在关系表中,执行插入操作
          const result = await momentService.addLabel(momentId, label.id);
        }
      }
      ctx.body = {
        code: 0,
        message: "为动态添加标签成功~",
      };
    } catch (error) {
      console.log(error);
      ctx.app.emit("error", FAILED_TO_ADD_MOMENT_LABEL, ctx);
    }
  }
}

module.exports = new MomentController();
