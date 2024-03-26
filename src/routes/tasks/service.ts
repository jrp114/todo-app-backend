import db from '../../database/db';

interface TaskArgs {
  name: string;
  description: string;
  tags: string;
  projectId: number;
  taskListId: string;
  position?: number;
}

interface UpdateTaskArgs extends TaskArgs {
  originalPosition: number;
  origin: string;
  id: string;
}

/**
 * Add a new task
 * @param object - name: string, description: string, tags: string, projectId: number, taskListId: string
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function addTask(params: TaskArgs) {
  const last = await db.tasks.findLast(params.projectId);
  if (!last) {
    params.position = 0;
  } else {
    params.position = last.position ? last.position + 1 : 0;
  }
  const task = await db.tasks.add(params);
  return task;
}

/**
 * Update a task
 * @param { name: string, description: string, tags: string, projectId: string, position: number, originalPosition: number, origin: string, taskListId: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function updateTask(params: UpdateTaskArgs) {
  const task = await db.task(async (t) => {
    const payload = {
      name: params.name,
      description: params.description,
      tags: params.tags,
      projectId: params.projectId,
      taskListId: params.taskListId,
      position: params.position || 0,
      id: params.id,
    };
    if (params.origin !== params.taskListId) {
      // we need the rest of the tasks within the same task list to move order up by one
      await t.tasks.movePosition(params.position, params.taskListId);
      return t.tasks.updateTask(payload);
    } else {
      if (params.position && params.originalPosition > params.position) {
        // we need the rest of the tasks within the same projectId to move order up by one
        await t.tasks.movePosition(params.position, params.taskListId);
      } else {
        // we need the rest of the tasks within the same projectId to move order down by one
        await t.tasks.movePositionDown(params.position, params.taskListId);
      }
      return t.tasks.updateTask(payload);
    }
  });
  return task;
}

/**
 * Delete a task
 * @param req params: { id: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function deleteTask(id: string) {
  const task = await db.tasks.remove(id);
  return task;
}
