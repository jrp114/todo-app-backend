import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { Extensions } from '.';
import { Accounts } from '../../db-interfaces';

export default class AccountsRepository {
  private insertCS: ColumnSet;
  private updateCS: ColumnSet;

  constructor(private db: IDatabase<Extensions>, private pgp: IMain) {
    const table = new pgp.helpers.TableName('accounts');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'name',
          prop: 'name',
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }

  async add(name: string): Promise<Accounts> {
    return this.db.one(
      this.pgp.helpers.insert({ name }, this.insertCS) + ' RETURNING *',
    );
  }
}
