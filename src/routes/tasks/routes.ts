import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import {
  addTaskController,
  deleteTaskController,
  updateTaskController,
} from './controller';

const router = express.Router();

router
  .route('/')
  .post(authorize(), async (req: Request, res: Response) =>
    addTaskController(req, res),
  );

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) =>
    updateTaskController(req, res),
  )
  .delete(authorize(), async (req: Request, res: Response) =>
    deleteTaskController(req, res),
  );

export default router;
