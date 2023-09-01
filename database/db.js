const PgPromise = require('pg-promise');
const  { TodosRepository } = require('./repos');

const initOptions = {
    extend(obj) {
        obj.todos = new TodosRepository(obj, pgp)
    }
}

const pgp = PgPromise(initOptions)

const dbConfig = {
    host: 'localhost',
    port: 5492,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
}

const db = pgp(dbConfig);

module.exports = db;