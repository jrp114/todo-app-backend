import { Request, Response } from 'express';
import db from '../../database/db';

/**
 * Add a new task
 * @param req body: { name: string, description: string, tags: string, projectId: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function addTask(req: Request, res: Response) {
  try {
    const last = await db.tasks.findLast(req.body.projectId);
    if (!last) {
      req.body.position = 0;
    } else {
      req.body.position = last.position ? last.position + 1 : 0;
    }
    const task = await db.tasks.add(req.body);
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send('Error adding task');
  }
}

/**
 * Update a task
 * @param req body: { name: string, description: string, tags: string, projectId: string, position: number, originalPosition: number, origin: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function updateTask(req: Request, res: Response) {
  const task = await db.task(async (t) => {
    if (req.body.origin !== req.body.projectId) {
      // we need the rest of the tasks within the same projectId to move order up by one
      await t.tasks.movePosition(req.body.position, req.body.projectId);
      return t.tasks.updateTask({
        ...req.body,
        position: req.body.position || 0,
      });
    } else {
      if (req.body.originalPosition > req.body.position) {
        // we need the rest of the tasks within the same projectId to move order up by one
        await t.tasks.movePosition(req.body.position, req.body.projectId);
      } else {
        // we need the rest of the tasks within the same projectId to move order down by one
        await t.tasks.movePositionDown(req.body.position, req.body.projectId);
      }
      return t.tasks.updateTask({
        ...req.body,
        position: req.body.position || 0,
      });
    }
  });
  res.status(201).send(task);
}

/**
 * Delete a task
 * @param req params: { id: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function deleteTask(req: Request, res: Response) {
  const task = await db.tasks.remove(req.params.id);
  res.status(201).send(task);
}
