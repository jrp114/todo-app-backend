import { Request, Response } from 'express';
import db from '../../database/db';
import logger from '../../helpers/logger';

/**
 * Get all comments for a task
 * @param req query: { taskId: string }
 * @param return Array<object>: { id: string, text: string, taskId: string, createdAt: string, updatedAt: string }
 */
export async function getComment(req: Request, res: Response) {
  try {
    const result = await db.comments.getByTask(req.query.taskId);
    res.status(200).send(result);
  } catch (error: any) {
    logger('getComment', 'error', error);
  }
}

/**
 * Create a new comment
 * @param req body: { text: string, taskId: string }
 * @param return object: { id: string, text: string, taskId: string, createdAt: string, updatedAt: string }
 */
export async function postComment(req: Request, res: Response) {
  try {
    const comment = await db.comments.add(req.body);
    res.status(201).send(comment);
  } catch (error: any) {
    logger('postComment', 'error', error.message);
  }
}

/**
 * Update a comment
 * @param req body: { text: string }
 * @param req params: { id: string }
 * @param return object: { id: string, text: string, taskId: string, createdAt: string, updatedAt: string }
 */
export async function updateComment(req: Request, res: Response) {
  try {
    const comment = await db.comments.updateComment({
      ...req.body,
      id: req.params.id,
    });
    res.status(201).send(comment);
  } catch (error: any) {
    logger('updateComment', 'error', error.message);
  }
}

/**
 * Delete a comment
 * @param req params: { id: string }
 * @param return object: { id: string, text: stringa taskId: string, createdAt: string, updatedAt: string }
 */
export async function deleteComment(req: Request, res: Response) {
  try {
    const comment = await db.comments.remove(req.params.id);
    res.status(201).send(comment);
  } catch (error: any) {
    logger('deleteComment', 'error', error.message);
  }
}
