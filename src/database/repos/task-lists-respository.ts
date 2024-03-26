import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { TaskLists } from '../../db-interfaces';
import { TasksWithProjects } from '../../routes/task-lists/map-tasks';
import { taskLists as sql } from '../sql';

export default class TaskListsRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('task_lists');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'name',
          prop: 'name',
        },
        {
          name: 'project_id',
          prop: 'projectId',
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }

  // async add(params: any) {
  //   console.log('params', params);
  //   return this.db.one(
  //     this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *',
  //   );
  // }

  async getTaskListsData(userId: string): Promise<Array<TasksWithProjects>> {
    return this.db.any(sql.getTaskListsData, userId);
  }

  async filterTaskListsData(
    value: any,
    userId: string,
  ): Promise<Array<TasksWithProjects>> {
    return this.db.any(sql.filterTaskListsData, {
      value: `%${value}%`,
      userId,
    });
  }

  async createTaskList(data: any): Promise<TaskLists> {
    return this.db.one(
      this.pgp.helpers.insert(data, this.insertCS) + ' RETURNING *',
    );
  }
}
