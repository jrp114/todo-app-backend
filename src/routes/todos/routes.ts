import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import {
  addTodo,
  deleteTodo,
  filterByTag,
  getTodoStatus,
  getTodos,
  updateTodo,
} from './service';

const router = express.Router();

router
  .route('/')
  .get(authorize(), async (req: Request, res: Response) => getTodos(req, res))
  .post(authorize(), async (req: Request, res: Response) => addTodo(req, res));

router
  .route('/status')
  .get(authorize(), async (req: Request, res: Response) =>
    getTodoStatus(req, res),
  );

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) => updateTodo(req, res))
  .delete(authorize(), async (req: Request, res: Response) =>
    deleteTodo(req, res),
  );

router
  .route('/filter')
  .get(authorize(), async (req: Request, res: Response) =>
    filterByTag(req, res),
  );

export default router;
