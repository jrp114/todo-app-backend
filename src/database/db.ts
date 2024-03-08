import * as dotenv from 'dotenv';
import PgPromise from 'pg-promise';
import {
  CommentsRepository,
  Extensions,
  TasksRepository,
  UsersRepository,
} from './repos';
import AccountsRepository from './repos/accounts-repository';
import ProjectsRepository from './repos/projects-repository';
import TaskListMembersRepository from './repos/task-list-members-repository';
import TaskListsRepository from './repos/task-lists-respository';

dotenv.config();

const initOptions = {
  extend(obj: PgPromise.IDatabase<Extensions> & Extensions) {
    obj.tasks = new TasksRepository(obj, pgp);
    obj.comments = new CommentsRepository(obj, pgp);
    obj.users = new UsersRepository(obj, pgp);
    obj.accounts = new AccountsRepository(obj, pgp);
    obj.taskLists = new TaskListsRepository(obj, pgp);
    obj.taskListMembers = new TaskListMembersRepository(obj, pgp);
    obj.projects = new ProjectsRepository(obj, pgp);
  },
  // // uncomment to log all queries
  // query(e: any) {
  //   console.log(e.query);
  // },
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
const db = pgp(url);

export default db;
