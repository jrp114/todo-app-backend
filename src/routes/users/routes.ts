import express, { Request, Response } from 'express';
import { addUser, login } from './service';

const router = express.Router();

router
  .route('/')
  .post(async (req: Request, res: Response) => addUser(req, res));

router
  .route('/login')
  .post(async (req: Request, res: Response) => login(req, res));

export default router;
