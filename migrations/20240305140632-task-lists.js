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
    .createTable('task_lists', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'string', length: 100 },
      project_id: {
        type: 'int',
        foreignKey: {
          name: 'task_list_project_id_fk',
          table: 'projects',
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
      db.runSql(`
        SELECT setval('task_lists_id_seq', (SELECT MAX(id) FROM projects) + 1);
      `),
    )
    .then(() =>
      db.runSql(
        `INSERT INTO task_lists(id, name, project_id) SELECT id, name, id FROM projects;
          ALTER TABLE tasks DROP CONSTRAINT todo_project_id_fk;`,
      ),
    )
    .then(() => db.renameColumn('tasks', 'project_id', 'task_list_id'))
    .then(() =>
      db.runSql(
        'ALTER TABLE tasks ADD CONSTRAINT tasks_task_list_id_fk FOREIGN KEY (task_list_id) REFERENCES task_lists(id) ON DELETE CASCADE ON UPDATE RESTRICT;',
      ),
    )
    .then(() => db.renameTable('project_members', 'task_list_members'))
    .then(() =>
      db.renameColumn('task_list_members', 'project_id', 'task_list_id'),
    )
    .then(() =>
      db.runSql(
        `ALTER TABLE task_list_members DROP CONSTRAINT project_members_project_id_fk;
          ALTER TABLE task_list_members DROP CONSTRAINT project_members_user_id_fk;`,
      ),
    )
    .then(() =>
      db.runSql(
        `ALTER TABLE task_list_members ADD CONSTRAINT task_list_members_task_list_id_fk FOREIGN KEY (task_list_id) REFERENCES task_lists(id) ON DELETE CASCADE ON UPDATE RESTRICT;
          ALTER TABLE task_list_members ADD CONSTRAINT task_list_members_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE RESTRICT;`,
      ),
    );
};

exports.down = function (db) {
  return db
    .runSql(
      `
        ALTER TABLE task_list_members DROP CONSTRAINT task_list_members_task_list_id_fk;
        ALTER TABLE task_list_members DROP CONSTRAINT task_list_members_user_id_fk;
        ALTER TABLE tasks DROP CONSTRAINT tasks_task_list_id_fk;
      `,
    )
    .then(() =>
      db.renameColumn('task_list_members', 'task_list_id', 'project_id'),
    )
    .then(() =>
      db.runSql(`
          ALTER TABLE task_list_members ADD CONSTRAINT project_members_project_id_fk FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE RESTRICT;
          ALTER TABLE task_list_members ADD CONSTRAINT project_members_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE RESTRICT;
        `),
    )
    .then(() => db.renameTable('task_list_members', 'project_members'))
    .then(() =>
      db.runSql('ALTER TABLE tasks DROP CONSTRAINT tasks_task_list_id_fk;'),
    )
    .then(() => db.renameColumn('tasks', 'task_list_id', 'project_id'))
    .then(() =>
      db.runSql(
        'ALTER TABLE tasks ADD CONSTRAINT todo_project_id_fk FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE RESTRICT;',
      ),
    )
    .then(() => db.runSql('DROP TABLE task_lists;'));
};

exports._meta = {
  version: 1,
};
