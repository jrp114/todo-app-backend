export const comments = {
  getByTask: 'SELECT * FROM comments WHERE task_id=$1 ORDER BY id DESC',
  delete: 'DELETE FROM comments WHERE id=$1',
};

export const tasks = {
  filterByTag: `SELECT * FROM tasks 
        WHERE id IN (
          SELECT DISTINCT id FROM (
            SELECT id, unnest(tags) AS tag
            FROM tasks
          ) AS subquery
          WHERE tag ILIKE $1 OR description ILIKE $1 OR name ILIKE $1) AND task_list_id = $2;`,
  delete: 'DELETE FROM tasks WHERE id=$1 RETURNING *;',
  get: 'SELECT * FROM tasks WHERE task_list_id = $1 ORDER BY position ASC;',
  movePosition:
    'UPDATE tasks SET position = position + 1 WHERE task_list_id = $2 AND position >= $1;',
  movePositionDown:
    'UPDATE tasks SET position = position - 1 WHERE task_list_id = $2 AND position <= $1;',
  findLast:
    'SELECT * FROM tasks WHERE task_list_id = $1 ORDER BY position DESC LIMIT 1;',
};

export const users = {
  getByEmail: 'SELECT * FROM users WHERE email=$1;',
};

export const taskLists = {
  getTaskListsData:
    'SELECT tl.id AS task_list_id, tl.name AS task_list_name, t.* FROM task_lists tl LEFT JOIN tasks t ON tl.id = t.task_list_id LEFT JOIN projects p ON tl.project_id = p.id LEFT JOIN task_list_members tlm ON t.task_list_id = tlm.task_list_id WHERE (tlm.user_id = $1 OR t.task_list_id IS NULL) AND (p.account_id = (SELECT account_id FROM users WHERE id = $1)) ORDER BY t.position ASC;',
  filterTaskListsData:
    'SELECT tl.id AS task_list_id, tl.name AS task_list_name, t.* FROM task_lists tl LEFT JOIN tasks t ON tl.id = t.task_list_id LEFT JOIN projects p ON tl.project_id = p.id LEFT JOIN task_list_members pm ON tl.id = pm.task_list_id WHERE (p.account_id = (SELECT account_id FROM users WHERE id = ${userId})) AND (pm.user_id = ${userId} OR t.task_list_id IS NULL) AND (t.id IS NULL OR t.id IN (SELECT id FROM (SELECT id, unnest(tags) AS tag FROM tasks) AS subquery WHERE tag ILIKE ${value}) OR t.name ILIKE ${value} OR t.description ILIKE ${value}) ORDER BY t.position ASC;',
};

export const projects = {
  get: 'SELECT * FROM projects WHERE account_id = $1;',
};
