import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import { getProjectsController } from './controller';

const router = express.Router();

router.route('/').get(authorize(), async (req: Request, res: Response) => {
  getProjectsController(req, res);
});

export default router;
