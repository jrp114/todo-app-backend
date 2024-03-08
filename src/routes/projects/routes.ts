import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import { getProjects } from './service';

const router = express.Router();

router.route('/').get(authorize(), async (req: Request, res: Response) => {
  getProjects(req, res);
});

export default router;
