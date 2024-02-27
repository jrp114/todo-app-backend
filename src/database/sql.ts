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
          WHERE tag ILIKE $1 OR description ILIKE $1 OR name ILIKE $1) AND project_id = $2;`,
  delete: 'DELETE FROM todos WHERE id=$1',
  get: 'SELECT * FROM todos WHERE project_id = $1 ORDER BY position ASC;',
  movePosition:
    'UPDATE todos SET position = position + 1 WHERE project_id = $2 AND position >= $1;',
  movePositionDown:
    'UPDATE todos SET position = position - 1 WHERE project_id = $2 AND position <= $1;',
  findLast:
    'SELECT * FROM todos WHERE project_id = $1 ORDER BY position DESC LIMIT 1;',
};

export const users = {
  getByEmail: 'SELECT * FROM users WHERE email=$1;',
};

export const projects = {
  get: 'SELECT * FROM projects WHERE id in (SELECT project_id FROM project_members WHERE user_id = $1);',
  getProjectsData:
    'SELECT p."name" as project_name, t.* FROM todos t INNER JOIN projects p ON p.id = t.project_id WHERE t.project_id IN (SELECT project_id FROM project_members pm WHERE pm.user_id = $1) ORDER BY position ASC;',
  filterProjectsData:
    'SELECT p."name" as project_name, t.* FROM todos t INNER JOIN projects p ON p.id = t.project_id  WHERE t.project_id IN (SELECT project_id FROM project_members pm WHERE pm.user_id = ${userId}) AND (t.id IN (SELECT id  FROM (SELECT id, unnest(tags) AS tag  FROM todos) AS subquery WHERE tag ILIKE ${value}) OR t.name ILIKE ${value} OR t.description ILIKE ${value}) ORDER BY position ASC;',
};
