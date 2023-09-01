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
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async get() {
    return this.db.manyOrNone('SELECT * FROM todos');
  }
  async getStatus(status) {
    return this.db.manyOrNone('SELECT * FROM todos WHERE status = $1', [
      status,
    ]);
  }
  async add(params) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
  async updateTodo(params) {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        `WHERE id = ${params.id} RETURNING *;`,
    );
  }
  async remove(id) {
    return this.db.oneOrNone('DELETE FROM todos WHERE id=$1', [id]);
  }
};
