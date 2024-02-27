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
    .createTable('projects', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'string', length: 100 },
      description: { type: 'string', length: 1000 },
      account_id: {
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
      },
      created_at: {
        type: 'timestamptz',
        defaultValue: new String('CURRENT_TIMESTAMP'),
      },
      updated_at: 'timestamptz',
    })
    .then(() =>
      db.addColumn('todos', 'project_id', {
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
      }),
    )
    .then(() =>
      db.createTable('project_members', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        project_id: {
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
        },
        user_id: {
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
        },
        created_at: {
          type: 'timestamptz',
          defaultValue: new String('CURRENT_TIMESTAMP'),
        },
        updated_at: 'timestamptz',
      }),
    )
    .then(() =>
      db.runSql(
        `
          INSERT INTO projects (name, description, account_id)
          SELECT 'Default', 'Default project', id FROM accounts;
          UPDATE todos SET project_id = (SELECT id FROM projects WHERE account_id = todos.account_id LIMIT 1);
          INSERT INTO project_members (project_id, user_id)
          SELECT p.id, u.id FROM projects p, users u WHERE u.account_id = p.account_id;
        `,
      ),
    );
};

exports.down = function (db) {
  return db
    .removeColumn('todos', 'project_id')
    .then(() =>
      db.dropTable('project_members').then(() => db.dropTable('projects')),
    );
};

exports._meta = {
  version: 1,
};
