module.exports = {
  todos: {
    filterByTag: `SELECT * FROM todos 
        WHERE id IN (
          SELECT DISTINCT id FROM (
            SELECT id, unnest(tags) AS tag
            FROM todos
          ) AS subquery
          WHERE tag ILIKE $1 OR description ILIKE $1 OR name ILIKE $1)`,
    delete: 'DELETE FROM todos WHERE id=$1',
    getStatus: 'SELECT * FROM todos WHERE status = $1',
    get: 'SELECT * FROM todos',
  },
  comments: {
    getByTodo: 'SELECT * FROM comments WHERE todo_id=$1 ORDER BY id DESC',
    delete: 'DELETE FROM comments WHERE id=$1',
  },
  users: {
    getByEmail: 'SELECT * FROM users WHERE email=$1',
  },
};
