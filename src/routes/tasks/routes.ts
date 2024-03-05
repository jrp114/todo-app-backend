import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import { addTask, deleteTask, updateTask } from './service';

const router = express.Router();

router
  .route('/')
  .post(authorize(), async (req: Request, res: Response) => addTask(req, res));

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) => updateTask(req, res))
  .delete(authorize(), async (req: Request, res: Response) =>
    deleteTask(req, res),
  );

export default router;
