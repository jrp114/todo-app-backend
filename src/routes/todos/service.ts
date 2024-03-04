import { Request, Response } from 'express';
import db from '../../database/db';

/**
 * Add a new todo
 * @param req body: { name: string, description: string, tags: string, projectId: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function addTodo(req: Request, res: Response) {
  try {
    const last = await db.todos.findLast(req.body.projectId);
    if (!last) {
      req.body.position = 0;
    } else {
      req.body.position = last.position ? last.position + 1 : 0;
    }
    const todo = await db.todos.add(req.body);
    res.status(201).send(todo);
  } catch (err) {
    res.status(500).send('Error adding todo');
  }
}

/**
 * Update a todo
 * @param req body: { name: string, description: string, tags: string, projectId: string, position: number, originalPosition: number, origin: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function updateTodo(req: Request, res: Response) {
  const todo = await db.task(async (task) => {
    if (req.body.origin !== req.body.projectId) {
      // we need the rest of the todos within the same projectId to move order up by one
      await task.todos.movePosition(req.body.position, req.body.projectId);
      return task.todos.updateTodo({
        ...req.body,
        position: req.body.position || 0,
      });
    } else {
      if (req.body.originalPosition > req.body.position) {
        // we need the rest of the todos within the same projectId to move order up by one
        await task.todos.movePosition(req.body.position, req.body.projectId);
      } else {
        // we need the rest of the todos within the same projectId to move order down by one
        await task.todos.movePositionDown(
          req.body.position,
          req.body.projectId,
        );
      }
      return task.todos.updateTodo({
        ...req.body,
        position: req.body.position || 0,
      });
    }
  });
  res.status(201).send(todo);
}

/**
 * Delete a todo
 * @param req params: { id: string }
 * @param return object: { id: string, name: string, description: string, tags: string, position: number, projectId: string }
 */
export async function deleteTodo(req: Request, res: Response) {
  const todo = await db.todos.remove(req.params.id);
  res.status(201).send(todo);
}
