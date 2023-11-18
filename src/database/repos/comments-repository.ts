import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { comments as sql } from '../sql';

export default class CommentsRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
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
          skip: (e: any) => !e.todo_id,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async getByTodo(id: any) {
    return this.db.manyOrNone(sql.getByTodo, [id]);
  }
  async add(params: any) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
  async updateComment(params: any) {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        ` WHERE id = ${params.id} RETURNING *;`,
    );
  }
  async remove(id: any) {
    return this.db.oneOrNone(sql.delete, [id]);
  }
}
