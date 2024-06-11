import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import { addProjectController, getProjectsController } from './controller';

const router = express.Router();

router
  .route('/')
  .get(authorize(), async (req: Request, res: Response) => {
    getProjectsController(req, res);
  })
  .post(authorize(), async (req: Request, res: Response) => {
    addProjectController(req, res);
  });

export default router;
