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
  return db.removeColumn('todos', 'status').then(() => {
    return db.removeColumn('todos', 'account_id');
  });
};

exports.down = function (db) {
  return db
    .addColumn('todos', 'account_id', {
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
    })
    .then(() =>
      db.addColumn('todos', 'status', { type: 'varchar', require: true }),
    );
};

exports._meta = {
  version: 1,
};
