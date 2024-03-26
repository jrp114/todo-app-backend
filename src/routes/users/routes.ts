import express, { Request, Response } from 'express';
import { addUserController, loginController } from './controller';

const router = express.Router();

router
  .route('/')
  .post(async (req: Request, res: Response) => addUserController(req, res));

router
  .route('/login')
  .post(async (req: Request, res: Response) => loginController(req, res));

export default router;
