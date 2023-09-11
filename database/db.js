const PgPromise = require('pg-promise');
const { TodosRepository } = require('./repos');
const { CommentsRepository } = require('./repos');

const initOptions = {
  extend(obj) {
    obj.todos = new TodosRepository(obj, pgp);
    obj.comments = new CommentsRepository(obj, pgp);
  },
};

const pgp = PgPromise(initOptions);

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const db = pgp(dbConfig);

module.exports = db;
