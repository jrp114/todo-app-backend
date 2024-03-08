import { Request, Response } from 'express';
import db from '../../database/db';
import { mapTasks } from './map-tasks';

/**
 * Get all task lists
 * @param req query: { userId: string }
 * @param return Array<object>: { id: string, name: string, description: string, position: number, tags: string[], taskListId: string, tagListName: string }
 */
export async function getTaskListsData(req: Request, res: Response) {
  const result = await db.taskLists.getTaskListsData(
    req.query.userId as string,
  );
  res.status(200).send(mapTasks(result));
}

/**
 * Filter task lists by name, description, or tags
 * @param req query: { value: string, userId: string }
 * @param return Array<object>: { id: string, name: string, description: string, position: number, tags: string[], taskListId: string, tagListName: string }
 */
export async function filterTaskListsData(req: Request, res: Response) {
  const result = await db.taskLists.filterTaskListsData(
    req.query.value,
    req.query.userId as string,
  );
  res.status(200).send(mapTasks(result));
}

/**
 * Create a new task list
 * @param req body: { name: string, description: string, accountId: string }
 * @param return object: { name: string, description: string, accountId: string, createdAt: string, updatedAt: string}
 */
export async function createTaskList(req: Request, res: Response) {
  const response = await db.taskLists.createTaskList(req.body);
  await db.taskListMembers.add({
    userId: req.body.userId,
    taskListId: response.id,
  });
  res.status(201).send(response);
}
