module.exports = {
  todos: {
    filterByTag: `SELECT * FROM todos 
        WHERE id IN (
          SELECT DISTINCT id FROM (
            SELECT id, unnest(tags) AS tag
            FROM todos
          ) AS subquery
          WHERE tag ILIKE $2 OR description ILIKE $2 OR name ILIKE $1)`,
    delete: 'DELETE FROM todos WHERE id=$1',
    getStatus: 'SELECT * FROM todos WHERE status = $1',
    get: 'SELECT * FROM todos',
  },
};
