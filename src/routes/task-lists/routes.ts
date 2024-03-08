import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import {
  createTaskList,
  filterTaskListsData,
  getTaskListsData,
} from './service';

const router = express.Router();

router.route('/').post(authorize(), async (req: Request, res: Response) => {
  createTaskList(req, res);
});

router
  .route('/tasks')
  .get(authorize(), async (req: Request, res: Response) =>
    getTaskListsData(req, res),
  );

router
  .route('/tasks/filter')
  .get(authorize(), async (req: Request, res: Response) =>
    filterTaskListsData(req, res),
  );

export default router;
