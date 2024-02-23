'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db
    .createTable('accounts', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'string', length: 100 },
      created_at: {
        type: 'timestamptz',
        defaultValue: new String('CURRENT_TIMESTAMP'),
      },
      updated_at: 'timestamptz',
    })
    .then(() =>
      db.addColumn('users', 'account_id', {
        type: 'int',
        foreignKey: {
          name: 'user_account_id_fk',
          table: 'accounts',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: 'id',
        },
      }),
    )
    .then(() =>
      db.runSql(
        `INSERT INTO accounts (id, name) VALUES (1, 'Initial Account');`,
      ),
    )
    .then(() => db.runSql('UPDATE users SET account_id = 1'))
    .then(() =>
      db.addColumn('todos', 'account_id', {
        type: 'int',
        foreignKey: {
          name: 'todo_account_id_fk',
          table: 'accounts',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT',
          },
          mapping: 'id',
        },
      }),
    )
    .then(() => db.runSql('UPDATE todos SET account_id = 1'));
};

exports.down = function (db) {
  return db
    .removeColumn('users', 'account_id')
    .then(() => db.removeColumn('todos', 'account_id'))
    .then(() => db.dropTable('accounts'));
};

exports._meta = {
  version: 1,
};
