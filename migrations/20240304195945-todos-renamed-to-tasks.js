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
    .renameTable('todos', 'tasks')
    .then(() => db.renameColumn('comments', 'todo_id', 'task_id'));
};

exports.down = function (db) {
  return db
    .renameColumn('comments', 'task_id', 'todo_id')
    .then(() => db.renameTable('tasks', 'todos'));
};

exports._meta = {
  version: 1,
};
