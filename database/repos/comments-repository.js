const { comments: sql } = require('../sql');

module.exports = class CommentsRepository {
  constructor(db, pgp) {
    const table = new pgp.helpers.TableName('comments');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'text',
          prop: 'text',
        },
        {
          name: 'todo_id',
          prop: 'todo_id',
          skip: (e) => !e.todo_id,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async getByTodo(id) {
    return this.db.manyOrNone(sql.getByTodo, [id]);
  }
  async add(params) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
  async updateComment(params) {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        ` WHERE id = ${params.id} RETURNING *;`,
    );
  }
  async remove(id) {
    return this.db.oneOrNone(sql.delete, [id]);
  }
};
