import { Request, Response } from 'express';
import db from '../../database/db';

/**
 * Get all comments for a todo
 * @param req query: { todoId: string }
 * @param return Array<object>: { id: string, text: string, todoId: string, createdAt: string, updatedAt: string }
 */
export async function getComment(req: Request, res: Response) {
  const result = await db.comments.getByTodo(req.query.todoId);
  res.status(200).send(result);
}

/**
 * Create a new comment
 * @param req body: { text: string, todoId: string }
 * @param return object: { id: string, text: string, todoId: string, createdAt: string, updatedAt: string }
 */
export async function postComment(req: Request, res: Response) {
  const comment = await db.comments.add(req.body);
  res.status(201).send(comment);
}

/**
 * Update a comment
 * @param req body: { text: string }
 * @param req params: { id: string }
 * @param return object: { id: string, text: string, todoId: string, createdAt: string, updatedAt: string }
 */
export async function updateComment(req: Request, res: Response) {
  const comment = await db.comments.updateComment({
    ...req.body,
    id: req.params.id,
  });
  res.status(201).send(comment);
}

/**
 * Delete a comment
 * @param req params: { id: string }
 * @param return object: { id: string, text: string, todoId: string, createdAt: string, updatedAt: string }
 */
export async function deleteComment(req: Request, res: Response) {
  const comment = await db.comments.remove(req.params.id);
  res.status(201).send(comment);
}
