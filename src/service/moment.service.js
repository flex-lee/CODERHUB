const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment (content,user_id) VALUES (?,?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async queryList(offset = 0, size = 10) {
    // 新增了子查询查询对应的评论数量
    const statement = `
    SELECT
      m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT("id",u.id,"name",u.name,"avatarUrl",u.avatar_url,"createTime",u.createAt,"updateTime",u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id=m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE  ml.moment_id=m.id) labelCount
    FROM moment m
    LEFT JOIN user u ON u.id=m.user_id
    LIMIT ?,?;
    `;
    const [result] = await connection.execute(statement, [
      String(offset),
      String(size),
    ]);
    return result;
  }

  async queryById(id) {
    // 新增左连接对应的label,然后子查询对应的comments
    const statement = `
    SELECT
      m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT("id",u.id,"name",u.name,"avatarUrl",u.avatar_url,"createTime",u.createAt,"updateTime",u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id=m.id) commentCount,
      (
        SELECT 
        (
          JSON_ARRAYAGG(JSON_OBJECT(
          "id",c.id,"content",c.content,"commentId",c.comment_id,
          "user",JSON_OBJECT(
            "id",cu.id,"name",cu.name
            )
          ))
        )
        FROM comment c
        LEFT JOIN user cu ON cu.id=c.user_id
        WHERE c.moment_id=m.id
      ) comments,
      (SELECT COUNT(*) FROM moment_label ml WHERE  ml.moment_id=m.id) labelCount,
      (
        JSON_ARRAYAGG(JSON_OBJECT("id",l.id,"name",l.name))
      ) labels
    FROM moment m
    LEFT JOIN user u ON u.id=m.user_id
    LEFT JOIN moment_label ml ON ml.moment_id=m.id
    LEFT JOIN label l ON l.id=ml.label_id
    WHERE m.id=?
    GROUP BY m.id;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  // 删除
  async remove(id) {
    const statement = "DELETE FROM moment WHERE id=?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  // 修改
  async updateContent(id, content) {
    const statement = "UPDATE moment SET content=? WHERE id=?;";
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }

  // 判断是否存在label_id和moment_id 的关系
  async hasLabel(momentId, labelId) {
    const statement =
      "SELECT * FROM moment_label WHERE moment_id=? AND label_id=?;";
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result.length; //判断是否存在该值,使用!!转为boolean类型
  }

  // 插入关系表
  async addLabel(momentId, labelId) {
    const statement =
      "INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);";
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
