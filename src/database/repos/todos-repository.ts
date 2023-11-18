import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { todos as sql } from '../sql';

export default class TodosRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
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
  async getStatus(status: any) {
    return this.db.manyOrNone(sql.getStatus, [status]);
  }
  async add(params: any) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
  async updateTodo(params: any) {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        ` WHERE id = ${params.id} RETURNING *;`,
    );
  }
  async remove(id: any) {
    return this.db.oneOrNone(sql.delete, [id]);
  }
  async filterByTag(value: any) {
    const result = await this.db.manyOrNone(sql.filterByTag, [`%${value}%`]);
    return result;
  }
}
