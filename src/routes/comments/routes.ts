import express, { Request, Response } from 'express';
import authorize from '../../helpers/authorize';
import {
  deleteCommentController,
  getCommentController,
  postCommentController,
  updateCommentController,
} from './controller';

const router = express.Router();

router
  .route('/')
  .get(authorize(), async (req: Request, res: Response) =>
    getCommentController(req, res),
  )
  .post(authorize(), async (req: Request, res: Response) =>
    postCommentController(req, res),
  );

router
  .route('/:id')
  .put(authorize(), async (req: Request, res: Response) =>
    updateCommentController(req, res),
  )
  .delete(authorize(), async (req: Request, res: Response) =>
    deleteCommentController(req, res),
  );

export default router;
