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
          name: 'project_id',
          prop: 'projectId',
          skip: (e) => !e.exists,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async get(projectId: string) {
    return this.db.manyOrNone(sql.get, [projectId]);
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
  async filterByTag(value: any, projectId: string) {
    const result = await this.db.manyOrNone(sql.filterByTag, [
      `%${value}%`,
      projectId,
    ]);
    return result;
  }
  async movePosition(position: any, projectId: any) {
    return this.db.none(sql.movePosition, [position || 0, projectId]);
  }
  async movePositionDown(position: any, projectId: any) {
    return this.db.none(sql.movePositionDown, [position || 0, projectId]);
  }
  async findLast(projectId: number) {
    return this.db.oneOrNone(sql.findLast, [projectId]);
  }
}
