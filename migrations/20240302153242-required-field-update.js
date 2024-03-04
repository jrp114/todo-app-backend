'use strict';

var async = require('async');

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
  return async.series([
    db.changeColumn.bind(db, 'users', 'email', {
      type: 'string',
      notNull: true,
    }),
    db.changeColumn.bind(db, 'users', 'hash', {
      type: 'string',
      notNull: true,
    }),
    db.changeColumn.bind(db, 'users', 'salt', {
      type: 'string',
      notNull: true,
    }),
    db.changeColumn.bind(db, 'accounts', 'name', {
      type: 'string',
      notNull: true,
    }),
    db.changeColumn.bind(db, 'comments', 'text', {
      type: 'string',
      notNull: true,
    }),
    db.changeColumn.bind(db, 'project_members', 'user_id', {
      type: 'int',
      foreignKey: {
        name: 'project_members_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
      notNull: true,
    }),
    db.changeColumn.bind(db, 'project_members', 'project_id', {
      type: 'int',
      foreignKey: {
        name: 'project_members_project_id_fk',
        table: 'projects',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
      notNull: true,
    }),
    db.changeColumn.bind(db, 'projects', 'account_id', {
      type: 'int',
      foreignKey: {
        name: 'project_account_id_fk',
        table: 'accounts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
      notNull: true,
    }),
  ]);
};

exports.down = function (db) {
  return async.series([
    db.changeColumn.bind(db, 'users', 'email', {
      type: 'string',
    }),
    db.changeColumn.bind(db, 'users', 'hash', {
      type: 'string',
    }),
    db.changeColumn.bind(db, 'users', 'salt', {
      type: 'string',
    }),
    db.changeColumn.bind(db, 'accounts', 'name', {
      type: 'string',
    }),
    db.changeColumn.bind(db, 'comments', 'text', {
      type: 'string',
    }),
    db.changeColumn.bind(db, 'project_members', 'user_id', {
      type: 'int',
      foreignKey: {
        name: 'project_members_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    }),
    db.changeColumn.bind(db, 'project_members', 'project_id', {
      type: 'int',
      foreignKey: {
        name: 'project_members_project_id_fk',
        table: 'projects',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    }),
    db.changeColumn.bind(db, 'projects', 'account_id', {
      type: 'int',
      foreignKey: {
        name: 'project_account_id_fk',
        table: 'accounts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    }),
  ]);
};

exports._meta = {
  version: 1,
};
