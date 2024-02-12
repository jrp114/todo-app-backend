import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import {
  deleteComment,
  getComment,
  postComment,
  updateComment,
} from './service';

const router = express.Router();

router
  .route('/')
  .get(authorize(), async (req: Request, res: Response) => getComment(req, res))
  .post(authorize(), async (req: Request, res: Response) =>
    postComment(req, res),
  );

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) =>
    updateComment(req, res),
  )
  .delete(authorize(), async (req: Request, res: Response) =>
    deleteComment(req, res),
  );

export default router;
