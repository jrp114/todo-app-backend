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
    .addColumn('todos', 'position', {
      type: 'int',
    })
    .then(() => {
      return db.runSql(`
        UPDATE todos
        SET position = subquery.row_number
        FROM (
          SELECT id, row_number() OVER (PARTITION BY status ORDER BY status) AS row_number
          FROM todos
        ) AS subquery
        WHERE todos.id = subquery.id
      `);
    });
};

exports.down = function (db) {
  return db.removeColumn('todos', 'position');
};

exports._meta = {
  version: 1,
};
