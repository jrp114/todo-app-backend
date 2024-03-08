import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { TaskListMembers } from '../../db-interfaces';

export default class TaskListMembersRepository {
  private insertCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('task_list_members');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'user_id',
          prop: 'userId',
        },
        {
          name: 'task_list_id',
          prop: 'taskListId',
        },
      ],
      {
        table,
      },
    );
  }

  async add(params: any): Promise<TaskListMembers> {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *',
    );
  }
}
