import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import {
  createTaskListController,
  filterTaskListsDataController,
  getTaskListsDataController,
} from './controller';

const router = express.Router();

router.route('/').post(authorize(), async (req: Request, res: Response) => {
  createTaskListController(req, res);
});

router
  .route('/tasks')
  .get(authorize(), async (req: Request, res: Response) =>
    getTaskListsDataController(req, res),
  );

router
  .route('/tasks/filter')
  .get(authorize(), async (req: Request, res: Response) =>
    filterTaskListsDataController(req, res),
  );

export default router;
