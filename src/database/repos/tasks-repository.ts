import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { Tasks } from '../../db-interfaces';
import { tasks as sql } from '../sql';

export default class TasksRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('tasks');
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
          name: 'tags',
          prop: 'tags',
          def: null,
        },
        {
          name: 'position',
          prop: 'position',
          skip: (e) => !e.exists,
        },
        {
          name: 'task_list_id',
          prop: 'taskListId',
          skip: (e) => !e.exists,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }

  async add(params: any): Promise<Tasks> {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }

  async updateTask(params: any): Promise<Tasks> {
    return this.db.one(
      this.pgp.helpers.update(params, this.updateCS) +
        ` WHERE id = ${params.id} RETURNING *;`,
    );
  }

  async remove(id: any): Promise<Tasks | null> {
    return this.db.oneOrNone(sql.delete, [id]);
  }

  async filterByTag(value: any, taskListId: string): Promise<Array<Tasks>> {
    const result = await this.db.manyOrNone(sql.filterByTag, [
      `%${value}%`,
      taskListId,
    ]);
    return result;
  }

  async movePosition(position: any, taskListId: any): Promise<null> {
    return this.db.none(sql.movePosition, [position || 0, taskListId]);
  }

  async movePositionDown(position: any, taskListId: any): Promise<null> {
    return this.db.none(sql.movePositionDown, [position || 0, taskListId]);
  }

  async findLast(taskListId: number): Promise<Tasks | null> {
    return this.db.oneOrNone(sql.findLast, [taskListId]);
  }
}
