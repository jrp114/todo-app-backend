const { todos: sql } = require('../sql');

module.exports = class TodosRepository {
  constructor(db, pgp) {
    const table = new pgp.helpers.TableName('todos');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'name',
          prop: 'name',
        },
        {
          name: 'description',
          prop: 'description',
        },
        {
          name: 'status',
          prop: 'status',
        },
        {
          name: 'tags',
          prop: 'tags',
          def: null,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async get() {
    return this.db.manyOrNone(sql.get);
  }
  async getStatus(status) {
    return this.db.manyOrNone(sql.getStatus, [status]);
  }
  async add(params) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
  async updateTodo(params) {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        ` WHERE id = ${params.id} RETURNING *;`,
    );
  }
  async remove(id) {
    return this.db.oneOrNone(sql.delete, [id]);
  }
  async filterByTag(value) {
    const result = await this.db.manyOrNone(sql.filterByTag, [
      value,
      `%${value}%`,
    ]);
    return result;
  }
};
