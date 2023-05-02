const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = "INSERT INTO label (name) VALUES (?);";
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async listLimit(page = 0, size = 5) {
    const offset = page * size;
    const statement = "SELECT * FROM label LIMIT ?,?;";
    const [result] = await connection.execute(statement, [
      String(offset),
      String(size),
    ]);
    return result;
  }
  async count() {
    const statement = `
    SELECT 
        COUNT(*) AS labelCount
    FROM label ;`;
    const [result] = await connection.execute(statement);
    return result;
  }
  async queryLabelByName(name) {
    const statement = "SELECT * FROM label WHERE name=?;";
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
