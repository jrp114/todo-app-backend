import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import { createProject, filterProjectsData, getProjects } from './service';

const router = express.Router();

router.route('/').post(authorize(), async (req: Request, res: Response) => {
  createProject(req, res);
});

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
