import db from '../../database/db';
import { mapTasks } from './map-tasks';

/**
 * Get all task lists
 * @param req query: { userId: string }
 * @param return Array<object>: { id: string, name: string, description: string, position: number, tags: string[], taskListId: string, tagListName: string }
 */
export async function getTaskListsData(userId: string) {
  const result = await db.taskLists.getTaskListsData(userId);
  return mapTasks(result);
}

/**
 * Filter task lists by name, description, or tags
 * @param value: string
 * @param userId: string
 * @param return Array<object>: { id: string, name: string, description: string, position: number, tags: string[], taskListId: string, tagListName: string }
 */
export async function filterTaskListsData(value: string, userId: string) {
  const result = await db.taskLists.filterTaskListsData(value, userId);
  return mapTasks(result);
}

/**
 * Create a new task list
 * @param name: string
 * @param description: string
 * @param userId: string
 * @param return object: { name: string, description: string, accountId: string, createdAt: string, updatedAt: string}
 */
export async function createTaskList(
  name: string,
  description: string,
  userId: string,
) {
  const response = await db.taskLists.createTaskList({
    name,
    description,
    userId,
  });
  await db.taskListMembers.add({
    userId,
    taskListId: response.id,
  });
  return response;
}
