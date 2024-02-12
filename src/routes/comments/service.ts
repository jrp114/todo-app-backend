import { Request, Response } from 'express';
import db from '../../database/db';

export async function getComment(req: Request, res: Response) {
  const result = await db.comments.getByTodo(req.query.todoId);
  res.status(200).send(result);
}

export async function postComment(req: Request, res: Response) {
  const comment = await db.comments.add(req.body);
  res.status(201).send(comment);
}

export async function updateComment(req: Request, res: Response) {
  const comment = await db.comments.updateComment({
    ...req.body,
    id: req.params.id,
  });
  res.status(201).send(comment);
}

export async function deleteComment(req: Request, res: Response) {
  const comment = await db.comments.remove(req.params.id);
  res.status(201).send(comment);
}
