import express, { Request, Response } from 'express';
import db from '../database/db';
import authorize from '../helpers/authorize';

const router = express.Router();

router
  .route('/')
  .get(authorize(), async (req: Request, res: Response) => {
    const result = await db.comments.getByTodo(req.query.todoId);
    res.status(200).send(result);
  })
  .post(authorize(), async (req: Request, res: Response) => {
    const comment = await db.comments.add(req.body);
    res.status(201).send(comment);
  });

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) => {
    const comment = await db.comments.updateComment({
      ...req.body,
      id: req.params.id,
    });
    res.status(201).send(comment);
  })
  .delete(authorize(), async (req: Request, res: Response) => {
    const comment = await db.comments.remove(req.params.id);
    res.status(201).send(comment);
  });

export default router;
