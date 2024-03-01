import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { projects as sql } from '../sql';

export default class ProjectsRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('projects');
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
          name: 'account_id',
          prop: 'accountId',
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }

  async add(params: any) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *',
    );
  }

  async getProjectsData(userId: string) {
    return this.db.any(sql.getProjectsData, userId);
  }

  async filterProjectsData(value: any, userId: string) {
    return this.db.any(sql.filterProjectsData, {
      value: `%${value}%`,
      userId,
    });
  }

  async createProject(data: any) {
    return this.db.one(
      this.pgp.helpers.insert(data, this.insertCS) + ' RETURNING *',
    );
  }
}
