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
  return db.changeColumn('todos', 'project_id', {
    type: 'int',
    notNull: true,
    foreignKey: {
      name: 'todo_project_id_fk',
      table: 'projects',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      mapping: 'id',
    },
  });
};

exports.down = function (db) {
  return db.changeColumn('todos', 'project_id', {
    type: 'int',
    foreignKey: {
      name: 'todo_project_id_fk',
      table: 'projects',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      mapping: 'id',
    },
  });
};

exports._meta = {
  version: 1,
};
