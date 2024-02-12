export const comments = {
  getByTodo: 'SELECT * FROM comments WHERE todo_id=$1 ORDER BY id DESC',
  delete: 'DELETE FROM comments WHERE id=$1',
};
export const todos = {
  filterByTag: `SELECT * FROM todos 
        WHERE id IN (
          SELECT DISTINCT id FROM (
            SELECT id, unnest(tags) AS tag
            FROM todos
          ) AS subquery
          WHERE tag ILIKE $1 OR description ILIKE $1 OR name ILIKE $1)`,
  delete: 'DELETE FROM todos WHERE id=$1',
  getStatus: 'SELECT * FROM todos WHERE status = $1',
  get: 'SELECT * FROM todos ORDER BY position ASC',
  movePosition:
    'UPDATE todos SET position = position + 1 WHERE status = $2 AND position >= $1;',
  movePositionDown:
    'UPDATE todos SET position = position - 1 WHERE status = $2 AND position <= $1;',
  findLast:
    'SELECT * FROM todos WHERE status = $1 ORDER BY position DESC LIMIT 1',
};
export const users = {
  getByEmail: 'SELECT * FROM users WHERE email=$1',
};
