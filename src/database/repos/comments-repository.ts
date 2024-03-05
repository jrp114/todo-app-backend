import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { Comments } from '../../db-interfaces';
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
          name: 'task_id',
          prop: 'taskId',
          skip: (e: any) => !e.exists,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async getByTask(id: any): Promise<Array<Comments>> {
    return this.db.manyOrNone(sql.getByTask, [id]);
  }
  async add(params: any): Promise<Comments> {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
  async updateComment(params: any): Promise<Comments> {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        ` WHERE id = ${params.id} RETURNING *;`,
    );
  }
  async remove(id: any): Promise<Comments> {
    return this.db.one(sql.delete, [id]);
  }
}
