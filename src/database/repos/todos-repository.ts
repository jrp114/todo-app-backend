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
        {
          name: 'position',
          prop: 'position',
          skip: (e) => !e.exists,
        },
        {
          name: 'account_id',
          prop: 'accountId',
          skip: (e) => !e.exists,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async get(accountId: string) {
    return this.db.manyOrNone(sql.get, [accountId]);
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
  async filterByTag(value: any, accountId: string) {
    const result = await this.db.manyOrNone(sql.filterByTag, [
      `%${value}%`,
      accountId,
    ]);
    return result;
  }
  async movePosition(position: any, status: any) {
    return this.db.none(sql.movePosition, [position || 0, status]);
  }
  async movePositionDown(position: any, status: any) {
    return this.db.none(sql.movePositionDown, [position || 0, status]);
  }
  async findLast(status: any, accountId: number) {
    return this.db.oneOrNone(sql.findLast, [status, accountId]);
  }
}
