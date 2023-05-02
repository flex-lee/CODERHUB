const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    // 1.获取评论的数据
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;

    // 对数据库进行新增评论操作
    const result = await commentService.create(content, momentId, id);

    ctx.body = {
      code: 0,
      message: "发表评论成功~",
      data: result,
    };
  }

  async reply(ctx, next) {
    // 1.获取评论的数据
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;

    // 对数据库的评论进行回复评论操作
    const result = await commentService.reply(content, momentId, commentId, id);

    ctx.body = {
      code: 0,
      message: "新增回复成功~",
      data: result,
    };
  }
}

module.exports = new CommentController();
