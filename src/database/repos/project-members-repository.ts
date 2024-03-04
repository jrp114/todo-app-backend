import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { ProjectMembers } from '../../db-interfaces';

export default class ProjectMembersRepository {
  private insertCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('project_members');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'user_id',
          prop: 'userId',
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
  }

  async add(params: any): Promise<ProjectMembers> {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *',
    );
  }
}
