import express, { Request, Response } from 'express';
import db from '../database/db';
import authorize from '../helpers/authorize';

const router = express.Router();

router
  .route('/')
  .get(authorize(), async (req: Request, res: Response) => {
    const all = await db.todos.get();
    res.status(200).send(all);
  })
  .post(authorize(), async (req: Request, res: Response) => {
    const last = await db.todos.findLast('todo');
    req.body.position = last.position + 1;
    const todo = await db.todos.add(req.body);
    res.status(201).send(todo);
  });

router
  .route('/status')
  .get(authorize(), async (req: Request, res: Response) => {
    const all = await db.todos.getStatus(req.query.status);
    res.status(200).send(all);
  });

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) => {
    const todo = await db.task(async (task) => {
      if (req.body.origin !== req.body.status) {
        // we need the rest of the todos within the same status to move order up by one
        await task.todos.movePosition(req.body.position, req.body.status);
        return task.todos.updateTodo({
          ...req.body,
          position: req.body.position || 0,
        });
      } else {
        if (req.body.originalPosition > req.body.position) {
          // we need the rest of the todos within the same status to move order up by one
          await task.todos.movePosition(req.body.position, req.body.status);
        } else {
          // we need the rest of the todos within the same status to move order down by one
          await task.todos.movePositionDown(req.body.position, req.body.status);
        }
        return task.todos.updateTodo({
          ...req.body,
          position: req.body.position || 0,
        });
      }
    });
    res.status(201).send(todo);
  })
  .delete(authorize(), async (req: Request, res: Response) => {
    const todo = await db.todos.remove(req.params.id);
    res.status(201).send(todo);
  });

router
  .route('/filter')
  .get(authorize(), async (req: Request, res: Response) => {
    const all = await db.todos.filterByTag(req.query.value);
    res.status(200).send(all);
  });

export default router;
