import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import { filterProjectsData, getProjects } from './service';

const router = express.Router();

router
  .route('/todos')
  .get(authorize(), async (req: Request, res: Response) =>
    getProjects(req, res),
  );

router
  .route('/todos/filter')
  .get(authorize(), async (req: Request, res: Response) =>
    filterProjectsData(req, res),
  );

export default router;
