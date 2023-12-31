import PgPromise from 'pg-promise';
import {
  CommentsRepository,
  Extensions,
  TodosRepository,
  UsersRepository,
} from './repos';

const initOptions = {
  extend(obj: PgPromise.IDatabase<Extensions> & Extensions) {
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

const url = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?options=-c%20search_path%3Dpublic`;
const db = pgp(url, {
  ssl,
});

export default db;
