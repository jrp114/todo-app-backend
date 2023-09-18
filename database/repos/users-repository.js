const { users: sql } = require('../sql');

module.exports = class UsersRepository {
  constructor(db, pgp) {
    const table = new pgp.helpers.TableName('users');
    this.db = db;
    this.pgp = pgp;
    this.insertCS = new pgp.helpers.ColumnSet(
      [
        {
          name: 'name',
          prop: 'name',
          skip: (e) => !e.name,
        },
        {
          name: 'email',
          prop: 'email',
          skip: (e) => !e.email,
        },
        {
          name: 'hash',
          prop: 'hash',
          skip: (e) => !e.hash,
        },
        {
          name: 'salt',
          prop: 'salt',
          skip: (e) => !e.salt,
        },
      ],
      {
        table,
      },
    );
    this.updateCS = this.insertCS.extend([{ name: 'id', cnd: true }]);
  }
  async getByEmail(email) {
    return this.db.oneOrNone(sql.getByEmail, [email]);
  }
  async add(params) {
    return this.db.one(
      this.pgp.helpers.insert(params, this.insertCS) + ' RETURNING *;',
    );
  }
};
