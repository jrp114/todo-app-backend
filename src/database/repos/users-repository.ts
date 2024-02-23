import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { users as sql } from '../sql';

export default class UsersRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('users');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'name',
          prop: 'name',
          skip: (e: any) => !e.name,
          def: null,
        },
        {
          name: 'email',
          prop: 'email',
          skip: (e: any) => !e.email,
        },
        {
          name: 'hash',
          prop: 'hash',
          skip: (e: any) => !e.hash,
        },
        {
          name: 'salt',
          prop: 'salt',
          skip: (e: any) => !e.salt,
        },
        {
          name: 'account_id',
          prop: 'account_id',
          skip: (e: any) => !e.exists,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async getByEmail(email: string) {
    return this.db.oneOrNone(sql.getByEmail, [email]);
  }
  async add(params: any) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
}
