const PgPromise = require('pg-promise');
const {
  TodosRepository,
  CommentsRepository,
  UsersRepository,
} = require('./repos');

const initOptions = {
  extend(obj) {
    obj.todos = new TodosRepository(obj, pgp);
    obj.comments = new CommentsRepository(obj, pgp);
    obj.users = new UsersRepository(obj, pgp);
  },
};

const pgp = PgPromise(initOptions);

const ssl =
  process.env.NODE_ENV === 'heroku-dev'
    ? {
        rejectUnauthorized: false,
      }
    : false;

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl,
};

const db = pgp(dbConfig);

module.exports = db;
