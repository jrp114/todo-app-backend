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
  return db.createTable('comments', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    text: 'string',
    todo_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'comments_todo_id_fk',
        table: 'todos',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
      },
    },
    created_at: {
      type: 'timestamptz',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    updated_at: 'timestamptz',
  });
};

exports.down = function (db) {
  return db.dropTable('comments');
};

exports._meta = {
  version: 1,
};
