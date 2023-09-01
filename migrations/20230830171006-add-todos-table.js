'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = now();
          RETURN NEW;
      END; $$ language 'plpgsql';`)
    .then(() => db.createTable('todos', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'varchar', require: true },
      description: { type: 'varchar', defaultValue: '' },
      status: { type: 'varchar', require: true },
      created_at: { type: 'timestamptz', defaultValue: new String('CURRENT_TIMESTAMP') },
      updated_at: 'timestamptz'
    })
    .then(() => db.runSql(`
      CREATE TRIGGER update_todos_updated_at BEFORE UPDATE
      ON todos FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();`)));
};

exports.down = function(db) {
  return db.dropTable('todos');
};

exports._meta = {
  "version": 1
};
